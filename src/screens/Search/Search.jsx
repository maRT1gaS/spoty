import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  CardsList,
  MusicList,
  Loader,
  ContentNotification,
} from '../../components/index';
import { loadingAction } from '../../redux/actions/loadingAction';
import { SEARCH } from '../../redux/actionTypes';
import useDebounce from '../../hooks/useDebounce';
import { TSong } from '../../types/Song.type';

const Search = ({
  searchData: { songs, artists, albums },
  searchValue,
  isLoading,
  loadingSearchData,
}) => {
  const debaunceValue = useDebounce(searchValue, 500);
  useEffect(() => {
    loadingSearchData(`/search?query=${debaunceValue}`, SEARCH);
  }, [loadingSearchData, debaunceValue]);

  return (
    <>
      <Helmet>
        <title>Поиск</title>
      </Helmet>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {songs.length > 0 && <MusicList name='Песни' songs={songs} />}
            {artists.length > 0 && (
              <CardsList name='Артисты' type='artist' data={artists} />
            )}
            {albums.length > 0 && (
              <CardsList name='Альбомы' type='album' data={albums} />
            )}
            {songs.length === 0 &&
              artists.length === 0 &&
              albums.length === 0 && (
                <ContentNotification title='Ничего не найдено...' />
              )}
          </>
        )}
      </>
    </>
  );
};

Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchData: PropTypes.shape({
    songs: PropTypes.arrayOf(PropTypes.shape(TSong)),
    albums: PropTypes.arrayOf(
      PropTypes.shape({
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.string,
      })
    ),
  }).isRequired,
  loadingSearchData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingData.isLoading,
  searchData: state.loadingData.search,
});

const mapDispatchToProps = {
  loadingSearchData: (url, type) => loadingAction(url, type),
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
