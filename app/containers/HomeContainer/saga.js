import { put, call, takeLatest } from 'redux-saga/effects';
import { getTracks } from '@services/iTunesApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_SONGS } = homeContainerTypes;
const { successGetSongs, failureGetSongs } = homeContainerCreators;
export function* getSongs(action) {
  const response = yield call(getTracks, action.searchTerm);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}
// Individual exports for testing
export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_SONGS, getSongs);
}
