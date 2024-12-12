import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about-servise',
  templateUrl: './about-servise.component.html',
  styleUrls: ['./about-servise.component.scss'],
  standalone: false, // компонент є standalone

})
export class AboutServiseComponent implements OnInit {
  breadcrumb: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Отримання параметра `:name` з URL
    this.route.paramMap.subscribe((params) => {
      const serviceName = params.get('name');
      this.breadcrumb = serviceName ? decodeURIComponent(serviceName) : 'Деталі сервісу';

      // Динамічне оновлення хлібних крихт, якщо потрібно
      this.updateBreadcrumb(this.breadcrumb);
    });
  }

  updateBreadcrumb(name: string): void {
    this.router.config.forEach((route) => {
      if (route.path === 'services/all') {
        const child = route.children?.find((childRoute) => childRoute.path === ':name');
        if (child) {
          child.data = { breadcrumb: name };
        }
      }
    });
  }
}
