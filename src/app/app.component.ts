import { Component } from '@angular/core';
import { CheckDeviceService } from './services/checkDevice.service';
import { Location } from '@angular/common';
import { animations } from '../app/interface/animation';
import { FirebaseDataService } from './config/firebaseData.service';
import { ToogleService } from './services/toogle.service';
import { BasketComponent } from "./components/basket/basket.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false, // компонент є standalone
  animations: [
    animations.bot,
    animations.bot3,
    animations.top,
    animations.top1,
    animations.top2,
    animations.top3,
    animations.top4,
    animations.bot5,
    animations.left,
    animations.left1,
    animations.left2,
    animations.left3,
    animations.left4,
    animations.left5,
    animations.right1,
    animations.swichCard,
    animations.appearance,
    animations.fadeIn,
  ],
})
export class AppComponent {
  title = 'budengineer';
  images = [
    '/bg-img/1.svg',
    '/bg-img/2.svg',
    '/bg-img/3.svg',
    '/bg-img/4.svg',
  ];
  currentImageIndex = 0;
  nextBG: boolean = true;
  authorization: boolean = false;
  isMobile: boolean = false;
  subscriptions: any[] = [];

  changeBG() {
    setInterval(() => {
      this.nextBG = false;
      setTimeout(() => {
        this.nextBG = true;
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }, 100);
    }, 20000);
  }

  get currentImage() {
    return this.images[this.currentImageIndex];
  }
  posts: any[] = [];
  basketMenu: boolean = false;

  constructor(
    private location: Location,
    private checkDeviceService: CheckDeviceService,
    private firebaseDataService: FirebaseDataService,
    private toogleService: ToogleService,
    private dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    this.checkDeviceService.checkIsMobile();
    this.getCheckDevice();
  }

  // підписка на статус корзини
  async getBasketMenu() {
    console.log('getBasketMenu')
    this.toogleService.toogleBasket$.subscribe((status: boolean) => {
      this.basketMenu = status;
      if (this.basketMenu) {
      }
      console.log(this.basketMenu)
    });
  }

  async getCheckDevice() {
    // console.log('getCheckDevice')
    this.subscriptions.push(
      this.checkDeviceService.isMobile$.subscribe((status: boolean) => {
        // console.log(status)
        this.isMobile = status;
        if (!this.isMobile) {
          this.changeBG();
        }
      })
    );
  }
}
