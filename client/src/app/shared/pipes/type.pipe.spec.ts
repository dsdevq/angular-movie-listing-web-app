import { TypePipe } from './type.pipe';

describe('TypePipe', () => {
  const pipe = new TypePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "tv" to "TV Shows"', () => {
    expect(pipe.transform('TV Show', 2)).toContain('TV Shows');
  });

  it('transforms "movie" to "Movie"', () => {
    expect(pipe.transform('movie', 1)).toContain('Movie');
  });
});
