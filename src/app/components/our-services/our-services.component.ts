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
  // selectedService: any = null; // Вибрана послуга
  selectedServices: any[] = [];

  constructor(private basketService: BasketDataService) { }

  ngOnInit() {
    console.log(services)
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

  toggleServiceSelection(service: any): void {
    const index = this.selectedServices.findIndex(s => s.name === service.name);
    if (index > -1) {
      // Якщо послуга вже вибрана, видаляємо її
      this.selectedServices.splice(index, 1);
    } else {
      // Якщо послуга не вибрана, додаємо її
      this.selectedServices.push(service);
    }
    this.basketService.toggleServiceSelection(service);

    // console.log(this.selectedServices)
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

  // // Отримує всі вибрані послуги
  // getBasket(): any[] {
  //   return this.basketService.getSelectedServices();
  // }

  // Очищує корзину
  clearBasket(): void {
    this.basketService.clearBasket();
  }


  // // Вибір послуги
  // selectService(service: any) {
  //   this.selectedService = service;
  //   console.log('Вибрана послуга:', service);
  //   // Тут можна виконати додаткову дію з вибраною послугою
  // }

}
