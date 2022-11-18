import { GenresPipe } from './genres.pipe';

describe('GenresPipe', () => {
  const pipe = new GenresPipe();
  const dummyGenres = [
    {
      id: 1,
      name: 'TestGenre1',
    },
    {
      id: 2,
      name: 'TestGenre2',
    },
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms dummyGenres array to formatted string like "Genre1, Genre2"', () => {
    expect(pipe.transform(dummyGenres)).toBe('TestGenre1, TestGenre2');
  });
});
