import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs = this.createBreadcrumbs(root);
        this.breadcrumbs.next(breadcrumbs);
      });
  }

  private createBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    if (route) {
      const routeURL = route.url.map(segment => segment.path).join('/');
      const fullURL = `${url}/${routeURL}`;
      const breadcrumb = this.resolveBreadcrumb(route);

      if (breadcrumb) {
        breadcrumbs.push({ label: breadcrumb, url: fullURL });
      }

      if (route.firstChild) {
        return this.createBreadcrumbs(route.firstChild, fullURL, breadcrumbs);
      }
    }
    return breadcrumbs;
  }

  private resolveBreadcrumb(route: ActivatedRouteSnapshot): string | null {
    const breadcrumb = route.data['breadcrumb'];
    if (breadcrumb && breadcrumb.includes(':')) {
      // Замінюємо параметри, наприклад ':name' -> фактичне значення
      return breadcrumb.replace(/:([^/]+)/g, (_: any, key: string | number) => route.params[key] || key);
    }
    return breadcrumb || null;
  }
}
