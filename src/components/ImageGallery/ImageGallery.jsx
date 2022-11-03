import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';
import * as ImageAPI from '../../services/ImageApi';

class ImageGallery extends Component {
  KEY_API = '29396697-739a936ff485fb734bceeac87';

  state = {
    gallery: [],
    isLoading: false,
    page: 1,
    per_page: 12,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, per_page } = this.state;
    if (prevProps.wordSearch !== this.props.wordSearch) {
      this.setState({ page: 1, gallery: [] });
    }

    if (
      prevProps.wordSearch !== this.props.wordSearch ||
      prevState.page !== page
    ) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        ImageAPI.fetchImage(this.props.wordSearch, page, this.KEY_API, per_page)
          .then(gallery => {
            if (gallery.hits.length === 0) {
              toast.error(
                `There are no pictures on demand ${this.props.wordSearch}`
              );
              return;
            }
            this.setState(prevState => ({
              gallery: [...prevState.gallery, ...gallery.hits],
            }));
          })
          .catch(error => this.setState({ error }))
          .finally(() => this.setState({ isLoading: false }));
      }, 2000);
    }
  }

  handleButtonLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { gallery, isLoading, error, per_page } = this.state;

    return (
      <>
        {error && <h3>{error.message}</h3>}
        {gallery && (
          <ul className={css.gallery}>
            {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              );
            })}
          </ul>
        )}
        {isLoading && <Loader />}
        {!isLoading && gallery.length !== 0 &&  gallery.length >= per_page && (
          <Button onClick={this.handleButtonLoadMore} />
        )}
      </>
    );
  }
}

export { ImageGallery };

ImageGallery.propTypes = {
  wordSearch: PropTypes.string.isRequired,
};
