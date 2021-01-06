import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import T from '@components/T';
import { useInjectSaga } from 'utils/injectSaga';
import { selectHomeContainer, selectSongs, selectSongsError, selectSearchTerm } from './selectors';
import { homeContainerCreators } from './reducer';
import { StyledCard } from '@components/Cards';
import saga from './saga';
import { SongCard } from '@app/components/Cards/index';

const { Search } = Input;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;

export function HomeContainer({
  dispatchGetSongs,
  dispatchClearSongs,
  intl,
  songs,
  songsError = null,
  searchTerm,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = songs || songsError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [songs]);

  useEffect(() => {
    if (searchTerm && !songs?.length) {
      dispatchGetSongs(searchTerm);
      setLoading(true);
    }
  }, []);

  const handleOnChange = searchTerm => {
    if (!isEmpty(searchTerm)) {
      dispatchGetSongs(searchTerm);
      setLoading(true);
    } else {
      dispatchClearSongs();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = songs || [];
    const totalCount = get(songs, 'length', 0);

    return (
      (totalCount !== 0 || loading) && (
        <StyledCard>
          <Skeleton loading={loading} active>
            {searchTerm && (
              <div>
                <T id="search_query" values={{ searchTerm }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="results_count" values={{ totalCount }} />
              </div>
            )}
            {items.map((item, index) => {
              return <SongCard key={index} song={item} />;
            })}
          </Skeleton>
        </StyledCard>
      )
    );
  };
  const renderErrorState = () => {
    let songError;
    if (songsError) {
      songError = songsError;
    } else if (!get(songs, 'length', 0)) {
      songError = 'itunes_search_default';
    }
    return (
      !loading &&
      songError && (
        <StyledCard color={songsError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'iTunes_search' })}>
          <T id={songError} />
        </StyledCard>
      )
    );
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <StyledCard title={intl.formatMessage({ id: 'iTunes_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_search_results" />
        <Search
          data-testid="search-bar"
          defaultValue={searchTerm}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </StyledCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchGetSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
  intl: PropTypes.object,
  songs: PropTypes.array,
  songsError: PropTypes.object,
  searchTerm: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 800,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  songs: selectSongs(),
  songsError: selectSongsError(),
  searchTerm: selectSearchTerm()
});

function mapDispatchToProps(dispatch) {
  const { requestSongs, clearSongs } = homeContainerCreators;
  return {
    dispatchGetSongs: searchTerm => dispatch(requestSongs(searchTerm)),
    dispatchClearSongs: () => dispatch(clearSongs())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
