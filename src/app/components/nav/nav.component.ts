import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  imports: [RouterModule, MatToolbarModule, MatIconModule],
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
