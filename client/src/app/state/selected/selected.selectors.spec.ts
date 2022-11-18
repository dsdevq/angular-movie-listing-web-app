import * as SelectedSelectors from './selected.selectors';
import { IMovieDetailsState } from './../../shared/interfaces/interface';
describe('SelectedSelectors', () => {
  const dummyUserState = {} as IMovieDetailsState;

  describe('getSelectStatus selector', () => {
    const result = SelectedSelectors.getSelectStatus.projector(dummyUserState);

    it('Should return selected status', () => {
      expect(result).toEqual(dummyUserState.status);
    });
  });

  describe('selectItemData selector', () => {
    const result = SelectedSelectors.selectItemData.projector(dummyUserState);
    it('Should return selected item data', () => {
      expect(result).toEqual(dummyUserState.selected);
    });
  });
});
