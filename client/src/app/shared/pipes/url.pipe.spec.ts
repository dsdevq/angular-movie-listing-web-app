import { UrlPipe } from './url.pipe';

describe('UrlPipe', () => {
  const pipe = new UrlPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "TV Shows" to "tv-shows"', () => {
    expect(pipe.transform('TV Shows')).toBe('tv-shows');
  });

  it('transforms "Suggest me" to "/suggest-me"', () => {
    expect(pipe.transform('Suggest me', true)).toBe('/suggest-me');
  });
});
