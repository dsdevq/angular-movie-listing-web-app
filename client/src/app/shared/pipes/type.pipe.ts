import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type',
})
export class TypePipe implements PipeTransform {
  transform(value: string, arg: number): string {
    if (!value) {
      return '';
    }
    if (value.toLowerCase() === 'tv') {
      value = 'TV Show';
    } else {
      value = `${value[0].toUpperCase()}${value.substring(1)}`;
    }
    return arg > 1 ? value + 's' : value;
  }
}
