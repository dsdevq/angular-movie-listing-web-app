import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url',
})
export class UrlPipe implements PipeTransform {
  transform = (value: string, isRedirect: boolean = false): string => {
    value = value.toLowerCase().split(' ').join('-');
    return isRedirect ? `/${value}` : value;
  };
}
