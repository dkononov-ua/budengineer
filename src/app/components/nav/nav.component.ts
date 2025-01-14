import { Component, OnInit } from '@angular/core';
import { ToogleService } from '../../services/toogle.service';
import { MatDialog } from '@angular/material/dialog';
import { BasketComponent } from '../basket/basket.component';
import { BasketDataService } from '../../services/basket-data.service';
import { FirebaseDataService } from '../../config/firebaseData.service';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: false, // компонент є standalone
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  basketMenu: boolean = false;
  basketStaus: boolean = false;
  selectedServices: any[] = [];
  userData: any = {};
  profileStaus: boolean = false;
  profileMenu: boolean = false;

  constructor(
    private toogleService: ToogleService,
    private dialog: MatDialog,
    private basketService: BasketDataService,
    private firebaseDataService: FirebaseDataService,
  ) { }

  ngOnInit() {
    this.getBasketMenu();
    this.getProfileMenu();
    this.getBasketData();
    this.getUserData();
  }

  async getUserData() {
    this.firebaseDataService.userData$.subscribe((data: any) => {
      this.userData = data;
      // console.log(this.userData);
    });
  }

  // підписка на статус корзини
  async getBasketMenu() {
    this.toogleService.toogleBasket$.subscribe((status: boolean) => {
      this.basketMenu = status;
      if (this.basketMenu) { this.openDialog() }
    });
  }

  // підписка на статус корзини
  async getProfileMenu() {
    this.toogleService.toogleProfile$.subscribe((status: boolean) => {
      this.profileMenu = status;
      if (this.profileMenu) { this.openDialogProfile() }
    });
  }

  // підписка на обрані послуги
  async getBasketData() {
    this.basketService.getSelectedServices().subscribe((services) => {
      this.selectedServices = services;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(BasketComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      this.toogleBasket();
    });
  }

  openDialogProfile() {
    const dialogRef = this.dialog.open(AuthComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      this.toogleProfile();
    });
  }

  toogleBasket() {
    // console.log('toogleBasket')
    this.basketStaus = !this.basketStaus;
    this.toogleService.toogleBasket(this.basketStaus);
  }

  toogleProfile() {
    // console.log('toogleProfile')
    this.profileStaus = !this.profileStaus;
    this.toogleService.toogleProfile(this.profileStaus);
  }


}
