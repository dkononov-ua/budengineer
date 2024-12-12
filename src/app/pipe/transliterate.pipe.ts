import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transliterate',
  standalone: false,  // Пайп є standalone

})
export class TransliteratePipe implements PipeTransform {
  private cyrillicToLatinMap: { [key: string]: string } = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'h',
    д: 'd',
    е: 'e',
    є: 'ye',
    ж: 'zh',
    з: 'z',
    и: 'y',
    і: 'i',
    ї: 'yi',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ю: 'yu',
    я: 'ya',
    ь: '',
    ъ: '',
    ' ': '-',
  };

  transform(value: string): string {
    return value
      .toLowerCase()
      .split('')
      .map((char) => this.cyrillicToLatinMap[char] || char)
      .join('');
  }
}
