import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSelected',
  pure: false,
  standalone: false,
})
export class FilterSelectedPipe implements PipeTransform {
  transform(services: any[], savedServices: any[]): any[] {
    console.log(1111111111111)
    console.log('services:', services);
    console.log('services:', savedServices);
    if (!services || !savedServices) {
      return services;
    }
    return services.filter(
      (service) => !savedServices.some((saved) => saved.name === service.name)
    );
  }
}
