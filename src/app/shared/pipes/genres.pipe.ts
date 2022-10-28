import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genres',
})
export class GenresPipe implements PipeTransform {
  transform = (value: { id: number; name: string }[]): string =>
    value.map((el) => el.name).join(', ');
}
