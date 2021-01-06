/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getSongs } from '../saga';
import { homeContainerTypes } from '../reducer';
import { getTracks } from '@app/services/iTunesApi';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const searchTerm = 'mac';
  let getSongsGenerator = getSongs({ searchTerm });

  it('should start task to watch for REQUEST_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_SONGS, getSongs));
  });

  it('should ensure that the action FAILURE_GET_SONGS is dispatched when the api call fails', () => {
    const res = getSongsGenerator.next().value;
    expect(res).toEqual(call(getTracks, searchTerm));
    const errorResponse = {
      errorMessage: 'There was an error while fetching informations.'
    };
    expect(getSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_SONGS is dispatched when the api call succeeds', () => {
    getSongsGenerator = getSongs({ searchTerm });
    const res = getSongsGenerator.next().value;
    expect(res).toEqual(call(getTracks, searchTerm));
    const searchResponse = {
      resultCount: 1,
      results: [{ trackName: searchTerm }]
    };
    expect(getSongsGenerator.next(apiResponseGenerator(true, searchResponse)).value).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_SONGS,
        data: searchResponse
      })
    );
  });
});
