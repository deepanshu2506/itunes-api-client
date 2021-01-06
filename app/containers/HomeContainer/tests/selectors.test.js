import { selectHomeContainer, selectSearchTerm, selectSongs, selectSongsError } from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let searchTerm;
  let songs;
  let songsError;

  beforeEach(() => {
    searchTerm = 'mac';
    songs = [{ searchTerm }];
    songsError = 'There was some error while fetching the repository details';

    mockedState = {
      homeContainer: {
        searchTerm,
        songs,
        songsError
      }
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(mockedState.homeContainer);
  });
  it('should select the searchTerm', () => {
    const repoSelector = selectSearchTerm();
    expect(repoSelector(mockedState)).toEqual(searchTerm);
  });

  it('should select songs', () => {
    const reposDataSelector = selectSongs();
    expect(reposDataSelector(mockedState)).toEqual(songs);
  });

  it('should select the songsError', () => {
    const reposErrorSelector = selectSongsError();
    expect(reposErrorSelector(mockedState)).toEqual(songsError);
  });
});
