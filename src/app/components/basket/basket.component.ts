import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { BasketDataService } from '../../services/basket-data.service';
import { services } from '../../data/data-our-services'
import { ToogleService } from '../../services/toogle.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

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
  totalPrice: number = 0;

  constructor(
    private basketService: BasketDataService,
    private toogleService: ToogleService,
    private dialog: MatDialog,
    private http: HttpClient,
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
      this.calculateTotalPrice();
    });
  }

  // Обчислення сумарної вартості
  calculateTotalPrice() {
    this.totalPrice = this.selectedServices.reduce((sum, service) => {
      return sum + (service.price || 0); // Якщо ціна не визначена, використовуємо 0
    }, 0);
  }

  // Формування тіла листа
  generateEmailBody() {
    let emailContent = 'Обрані послуги:\n\n';
    this.selectedServices.forEach(service => {
      emailContent += `Послуга: ${service.name}, Вартість: ${service.price} ${service.currency}\n`;
    });
    emailContent += `\nСумарна вартість: ${this.totalPrice} USD`; // Замість USD можете використовувати динамічну валюту
    return emailContent;
  }

  sendEmail() {
    const emailContent = this.generateEmailBody();
    const emailData = {
      to: 'recipient@example.com', // Кому відправляти
      subject: 'Обрані послуги', // Тема листа
      body: emailContent // Тіло листа
    };

    // Викликаєте HTTP-запит до бекенду для відправки пошти
    this.http.post('/api/send-email', emailData).subscribe(response => {
      console.log('Email sent successfully', response);
    }, error => {
      console.error('Error sending email', error);
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
