/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
  requestSongs: ['searchTerm'],
  successGetSongs: ['data'],
  failureGetSongs: ['error'],
  clearSongs: []
});
export const initialState = { searchTerm: null, songs: [], songsError: null };

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) => {
  const res = produce(state, draft => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_SONGS:
        draft.searchTerm = action.searchTerm;
        break;
      case homeContainerTypes.CLEAR_SONGS:
        return initialState;
      case homeContainerTypes.SUCCESS_GET_SONGS:
        draft.songs = action.data.results;
        break;
      case homeContainerTypes.FAILURE_GET_SONGS:
        draft.songsError = get(action.error, 'message', 'something_went_wrong');
        break;
    }
  });

  return res;
};

export default homeContainerReducer;
