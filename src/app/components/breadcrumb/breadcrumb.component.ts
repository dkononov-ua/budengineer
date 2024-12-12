import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: false, // компонент є standalone

})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: any[] = [];

  goBack() {
    this.location.back(); // Повертає на попередню сторінку
  }

  goForward() {
    this.location.forward(); // Переходить на наступну сторінку
  }
  constructor(private breadcrumbService: BreadcrumbService, private location: Location) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
