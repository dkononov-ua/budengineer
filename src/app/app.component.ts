import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { CheckDeviceService } from './services/checkDevice.service';
import { Location } from '@angular/common';
import { animations } from '../app/interface/animation';
import { CarueselComponent } from "./components/caruesel/caruesel.component";
import { ToolsComponent } from "./components/tools/tools.component";
import { OurServicesComponent } from "./components/our-services/our-services.component";

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    NavComponent,
    FooterComponent,
    CarueselComponent,
    ToolsComponent,
    OurServicesComponent,
],
  providers: [CheckDeviceService],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
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

  constructor(
    private location: Location,
    private checkDeviceService: CheckDeviceService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.checkDeviceService.checkIsMobile();
    this.getCheckDevice();
  }

  // підписка на шлях до серверу
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
