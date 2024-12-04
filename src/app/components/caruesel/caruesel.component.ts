import { Component, OnInit } from '@angular/core';
import { CheckDeviceService } from '../../services/checkDevice.service';

@Component({
  selector: 'app-caruesel',
  templateUrl: './caruesel.component.html',
  styleUrls: ['./caruesel.component.scss']
})
export class CarueselComponent implements OnInit {
  isMobile: boolean = false;
  subscriptions: any[] = [];
  imgPath: string = 'caruesel/mobile/';

  constructor(
    private checkDeviceService: CheckDeviceService,
  ) { this.getCheckDevice(); }

  async ngOnInit(): Promise<void> {

  }

  // підписка на шлях до серверу
  async getCheckDevice() {
    this.subscriptions.push(
      this.checkDeviceService.isMobile$.subscribe((status: boolean) => {
        this.isMobile = status;
        // console.log(this.isMobile)
        if (this.isMobile) {
          this.changePath(true);
        } else {
          this.changePath(false);
        }
      })
    );
  }

  changePath(value: boolean) {
    if (value) {
      this.imgPath = 'caruesel/mobile/'
    } else {
      this.imgPath = 'caruesel/web/'
    }
  }

}
