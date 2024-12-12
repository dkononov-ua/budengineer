import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: false,  // Пайп є standalone
})
export class PricePipe implements PipeTransform {
  // transform(value: number, currency: string = 'USD'): string {
  //   if (value == null || isNaN(value)) {
  //     return 'N/A'; // Повертає "N/A", якщо значення некоректне
  //   }

  //   // Форматує число у валютний формат
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: currency
  //   }).format(value);
  // }
  transform(value: number, currency: string = 'UAH'): string {
    if (value == null || isNaN(value)) {
      return 'N/A'; // Повертає "N/A", якщо значення некоректне
    }

    // Форматує число у валютний формат для гривні
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: currency
    }).format(value);
  }
}
