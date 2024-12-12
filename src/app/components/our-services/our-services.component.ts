import { Component, OnInit } from '@angular/core';
import { animations } from '../../../app/interface/animation';
import { services } from '../../data/data-our-services'
import { BasketDataService } from '../../services/basket-data.service';
@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
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
export class OurServicesComponent implements OnInit {

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
    // Для трьох карток
    if (window.innerWidth < 600) {
      const leftIndex = (this.currentServiceIndex - 1 + services.length) % services.length;
      const rightIndex = (this.currentServiceIndex + 1) % services.length;
      return [services[leftIndex], services[this.currentServiceIndex], services[rightIndex]];
    }

    // Для п'яти карток
    const leftIndex1 = (this.currentServiceIndex - 2 + services.length) % services.length;
    const leftIndex2 = (this.currentServiceIndex - 1 + services.length) % services.length;
    const rightIndex1 = (this.currentServiceIndex + 1) % services.length;
    const rightIndex2 = (this.currentServiceIndex + 2) % services.length;

    return [
      services[leftIndex1],
      services[leftIndex2],
      services[this.currentServiceIndex],
      services[rightIndex1],
      services[rightIndex2],
    ];
  }

  changeCenterService(index: number) {
    const servicesLength = this.services[this.currentCategoryIndex].services.length;
    if (index === 0 || index === 1) {
      this.currentServiceIndex =
        (this.currentServiceIndex - (2 - index) + servicesLength) % servicesLength;
    } else if (index === 3 || index === 4) {
      this.currentServiceIndex =
        (this.currentServiceIndex + (index - 2)) % servicesLength;
    }
  }


  changeCategoryID(index: number) {
    this.currentCategoryIndex = index;
    this.currentServiceIndex = 0; // Скидаємо до першого сервісу
  }


  constructor(private basketService: BasketDataService) { }

  ngOnInit() {
    this.getBasketData();
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
    // console.log(service)
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
