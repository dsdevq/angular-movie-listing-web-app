import { IMovie } from 'src/app/shared/interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform = (movies: IMovie[], searchString: string = ''): IMovie[] =>
    !searchString.trim()
      ? movies
      : movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchString.toLowerCase())
        );
}
