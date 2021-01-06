import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = state => state.homeContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => substate
  );

export const selectSongs = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => {
      return get(substate, 'songs', null);
    }
  );

export const selectSongsError = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => get(substate, 'songsError', null)
  );

export const selectSearchTerm = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => {
      return get(substate, 'searchTerm', null);
    }
  );

export default selectHomeContainer;
