import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { BasketDataService } from '../../services/basket-data.service';
import { services } from '../../data/data-our-services'
import { ToogleService } from '../../services/toogle.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  standalone: false, // компонент є standalone
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  categories = services;
  selectedServices: any[] = [];
  basketMenu: boolean = false;

  constructor(
    private basketService: BasketDataService,
    private toogleService: ToogleService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getBasketMenu();
    this.getBasketData();
  }

  // підписка на статус корзини
  async getBasketMenu() {
    this.toogleService.toogleBasket$.subscribe((status: boolean) => {
      this.basketMenu = status;
    });
  }

  // підписка на обрані послуги
  async getBasketData() {
    this.basketService.getSelectedServices().subscribe((services) => {
      this.selectedServices = services;
    });
  }

  // Викликає метод toggleServiceSelection
  toggleSelection(service: any): void {
    this.basketService.toggleServiceSelection(service);
  }

  // Перевіряє, чи вибрано послугу
  isServiceSelected(service: any): boolean {
    return this.basketService.isSelected(service);
  }

  // Очищає корзину
  clearBasket(): void {
    this.basketService.clearBasket();
  }

  closeBasket() {
    this.toogleService.toogleBasket(false);
  }
}
