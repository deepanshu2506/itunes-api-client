import { homeContainerReducer, initialState, homeContainerTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type  is dispatched', () => {
    const searchTerm = 'perfect';
    const expectedResult = { ...state, searchTerm };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.REQUEST_SONGS,
        searchTerm
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the songs List is present and loading = false when SUCCESS_GET_SONGS is dispatched', () => {
    const data = [{ name: 'perfect' }, { name: 'hello' }];
    const expectedResult = { ...state, songs: data };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.SUCCESS_GET_SONGS,
        data: { results: data }
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the SongsErrorMessage has some data and loading = false when FAILURE_GET_SONGS is dispatched', () => {
    const error = { message: 'something_went_wrong' };
    const expectedResult = { ...state, songsError: error.message };
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.FAILURE_GET_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });
});
