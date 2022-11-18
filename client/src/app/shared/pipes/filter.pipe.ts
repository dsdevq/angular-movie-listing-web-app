import { IMovie } from 'src/app/shared/interfaces/interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform = (
    movies: IMovie[] | null,
    searchString: string | null = ''
  ): IMovie[] | null => {
    if (movies === null) return movies;
    return !searchString?.trim()
      ? movies
      : movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchString.toLowerCase())
        );
  };
}
