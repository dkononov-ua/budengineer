import { Component, OnInit } from '@angular/core';
import * as pathConfig from '../../config/path-config';
import { animations } from '../../../app/interface/animation';
import { StatusMessageService } from '../../services/status-message.service';

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.scss'],
  animations: [
    animations.appearance,
  ],
})
export class StatusMessageComponent implements OnInit {

  path_logo = pathConfig.logo;
  statusMessage: string = '';

  constructor(
    private statusMessageService: StatusMessageService,
  ) { }

  ngOnInit() {
    this.statusMessageService.statusMessage$.subscribe((message: string) => {
      // console.log(message);
      this.statusMessage = message;
    });
  }

}
