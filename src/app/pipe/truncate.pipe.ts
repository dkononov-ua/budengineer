import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: false,  // Пайп є standalone

})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 15, suffix: string = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + suffix : value;
  }

}
