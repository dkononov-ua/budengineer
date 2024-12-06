import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketDataService {
  private selectedServices: any[] = []; // Масив для зберігання вибраних послуг
  private selectedServicesSubject = new BehaviorSubject<any[]>(this.selectedServices); // BehaviorSubject для спостереження за даними

  constructor() {}

  // Додає або видаляє послугу
  toggleServiceSelection(service: any): void {
    const index = this.selectedServices.findIndex(s => s.name === service.name);
    if (index > -1) {
      // Якщо послуга вже вибрана, видаляємо її
      this.selectedServices.splice(index, 1);
    } else {
      // Якщо послуга не вибрана, додаємо її
      this.selectedServices.push(service);
    }

    // Оновлюємо поточний стан
    this.selectedServicesSubject.next(this.selectedServices);
    console.log(this.selectedServices);
  }

  // Перевіряє, чи вибрана послуга
  isSelected(service: any): boolean {
    return this.selectedServices.some(s => s.name === service.name);
  }

  // Повертає всі вибрані послуги
  getSelectedServices(): Observable<any[]> {
    return this.selectedServicesSubject.asObservable(); // Повертає поточний стан як Observable
  }

  // Очищає корзину
  clearBasket(): void {
    this.selectedServices = [];
    this.selectedServicesSubject.next(this.selectedServices); // Оновлюємо стан
  }
}
