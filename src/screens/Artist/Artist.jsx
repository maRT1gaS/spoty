import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardsList, MusicList, Profile, Loader } from '../../components/index';
import { loadingAction } from '../../redux/actions/loadingAction';
import { ARTIST } from '../../redux/actionTypes';

class Artist extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      loadingArtist,
      artist,
    } = this.props;
    if (!artist?.id || artist.id !== id) {
      loadingArtist(`/artists/${id}`, ARTIST);
    }
  }

  render() {
    const { isLoading, artist } = this.props;
    return (
      <>
        <Helmet>
          <title>
            {artist?.id ? `Артист - ${artist.name}` : 'Артист не найден'}
          </title>
        </Helmet>
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {artist?.id ? (
                <>
                  <Profile imageUrl={artist.imageUrl} name={artist.name} />
                  {artist.albums.length > 0 && (
                    <CardsList
                      name='Альбомы '
                      type='album'
                      data={artist.albums}
                    />
                  )}
                  {artist.popular.length > 0 && (
                    <MusicList name='Песни' songs={artist.popular} />
                  )}
                </>
              ) : (
                <h2>ddd</h2>
              )}
            </>
          )}
        </>
      </>
    );
  }
}

Artist.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  match: PropTypes.shape().isRequired,
  artist: PropTypes.shape().isRequired,
  loadingArtist: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loadingData.isLoading,
  artist: state.loadingData.artist,
});

const mapDispatchToProps = {
  loadingArtist: (url, type) => loadingAction(url, type),
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);