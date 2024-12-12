  import { Component, OnInit } from '@angular/core';
  import { animations } from '../../interface/animation';
  import { services } from '../../data/data-our-services'
  import { BasketDataService } from '../../services/basket-data.service';
  @Component({
    selector: 'app-host-servises',
    templateUrl: './host-servises.component.html',
    styleUrls: ['./host-servises.component.scss'],
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
  export class HostServisesComponent implements OnInit {

    services = services; // Оригінальні дані
    categories = services;
    filteredCategories = services; // Відфільтровані категорії
    searchQuery = ''; // Рядок пошуку
    selectedServices: any[] = [];

    currentCategoryIndex = 0; // Індекс вибраної категорії
    currentServiceIndex = 0; // Індекс вибраного сервісу в категорії
    get visibleServices() {
      const currentCategory = this.services[this.currentCategoryIndex];
      const services = currentCategory.services;

      const leftIndex = (this.currentServiceIndex - 1 + services.length) % services.length;
      const rightIndex = (this.currentServiceIndex + 1) % services.length;

      return [services[leftIndex], services[this.currentServiceIndex], services[rightIndex]];
    }

    changeCenterService(index: number) {
      if (index === 0) {
        this.currentServiceIndex =
          (this.currentServiceIndex - 1 + this.services[this.currentCategoryIndex].services.length) %
          this.services[this.currentCategoryIndex].services.length;
      } else if (index === 2) {
        this.currentServiceIndex =
          (this.currentServiceIndex + 1) % this.services[this.currentCategoryIndex].services.length;
      }
    }

    constructor(private basketService: BasketDataService) { }

    ngOnInit() {
      this.getBasketData();
    }

    // Пошук послуг
    onSearch() {
      const query = this.searchQuery.toLowerCase();
      if (query) {
        this.filteredCategories = this.services
          .map(category => ({
            ...category,
            services: category.services.filter(service =>
              service.name.toLowerCase().includes(query)
            )
          }))
          .filter(category => category.services.length > 0);
      } else {
        this.filteredCategories = this.services;
      }
    }

    // Очищення пошуку
    clearSearch() {
      this.searchQuery = '';
      this.filteredCategories = this.services;
    }

    // підписка на обрані послуги
    async getBasketData() {
      this.basketService.getSelectedServices().subscribe((services) => {
        this.selectedServices = services;
      });
    }

    isSelected(service: any): boolean {
      return this.selectedServices.some(s => s.name === service.name);
    }

    // Викликає метод toggleServiceSelection
    toggleSelection(service: any): void {
      this.basketService.toggleServiceSelection(service);
    }

    // Перевіряє, чи вибрано послугу
    isServiceSelected(service: any): boolean {
      return this.basketService.isSelected(service);
    }

    // Очищує корзину
    clearBasket(): void {
      this.basketService.clearBasket();
    }

  }
