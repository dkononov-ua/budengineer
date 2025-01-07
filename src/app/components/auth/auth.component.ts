import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { BasketDataService } from '../../services/basket-data.service';
import { services } from '../../data/data-our-services'
import { ToogleService } from '../../services/toogle.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FirebaseDataService } from '../../config/firebaseData.service';
import { UserType } from '../../interface/user';
import { UserConfig } from '../../interface/userConfig';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: false,

})
export class AuthComponent implements OnInit {

  categories = services;
  selectedServices: any[] = [];
  basketMenu: boolean = false;
  totalPrice: number = 0;
  userData: UserType = UserConfig;
  authValue: number = 0;

  email = '';
  password = '';
  phoneNumber = '';
  autorization: boolean = false;

  constructor(
    private basketService: BasketDataService,
    private toogleService: ToogleService,
    private dialog: MatDialog,
    private http: HttpClient,
    private firebaseDataService: FirebaseDataService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.checkAuthorization();
  }

  async checkAuthorization() {
    this.authService.getCurrentUser().subscribe((data) => {
      if (data) {
        this.autorization = true;
      } else {
        this.autorization = false;
      }
    });
  }

  // підписка на статус корзини
  async getUserData() {
    this.firebaseDataService.userData$.subscribe((data: any) => {
      this.userData = data;
    });
  }

  // Викликає метод toggleServiceSelection
  toggleSelection(service: any): void {
    this.basketService.toggleServiceSelection(service);
  }

  register() {
    this.firebaseDataService.register(this.email, this.password, this.phoneNumber).catch((err) => {
      console.error(err);
    });
  }

  login() {
    this.firebaseDataService.login(this.email, this.password).catch((err) => {
      console.error(err);
    });
  }

  logout() {
    this.firebaseDataService.logout().catch((err) => {
      console.error(err);
    });
  }

  googleLogin() {
    this.firebaseDataService.googleLogin();
  }
}
