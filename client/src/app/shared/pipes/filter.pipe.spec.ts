import { IMovie } from './../interfaces/interface';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const pipe = new FilterPipe();
  const filteredDummyMovies: IMovie[] = [
    {
      title: 'Batman',
    } as IMovie,
  ];

  const dummySearchString = 'bAtMaN';

  const dummyMovies: IMovie[] = [
    {
      title: 'Spider-man',
    } as IMovie,
    {
      title: 'Batman',
    } as IMovie,
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms dummyGenres array to filtered array', () => {
    expect(pipe.transform(dummyMovies, dummySearchString)).toEqual(
      filteredDummyMovies
    );
  });
});
