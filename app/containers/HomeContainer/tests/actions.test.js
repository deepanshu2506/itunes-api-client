import { homeContainerTypes, homeContainerCreators } from '../reducer';

describe('HomeContainer action tests', () => {
  it('has a type of REQUEST_SONGS', () => {
    const expected = {
      type: homeContainerTypes.REQUEST_SONGS,
      searchTerm: 'searchTerm'
    };
    expect(homeContainerCreators.requestSongs('searchTerm')).toEqual(expected);
  });
});
