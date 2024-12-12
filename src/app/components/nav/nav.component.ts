import { Component, OnInit } from '@angular/core';
import { ToogleService } from '../../services/toogle.service';
import { MatDialog } from '@angular/material/dialog';
import { BasketComponent } from '../basket/basket.component';
import { BasketDataService } from '../../services/basket-data.service';

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

  constructor(
    private toogleService: ToogleService,
    private dialog: MatDialog,
    private basketService: BasketDataService,

  ) { }

  ngOnInit() {
    this.getBasketMenu();
    this.getBasketData();
  }

  // підписка на статус корзини
  async getBasketMenu() {
    this.toogleService.toogleBasket$.subscribe((status: boolean) => {
      this.basketMenu = status;
      if (this.basketMenu) { this.openDialog() }
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

  toogleBasket() {
    // console.log('toogleBasket')
    this.basketStaus = !this.basketStaus;
    this.toogleService.toogleBasket(this.basketStaus);
  }


}
