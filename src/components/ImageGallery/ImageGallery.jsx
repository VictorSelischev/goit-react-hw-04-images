import { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';
import * as ImageAPI from '../../services/ImageApi';

export const ImageGallery = ({ wordSearch }) => {
  const KEY_API = '29396697-739a936ff485fb734bceeac87';
  const per_page = 12;
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (wordSearch !== '') {
      setPage(1);
      setGallery([]);
    }
  }, [wordSearch]);

  useEffect(() => {
    if (wordSearch === '') {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      ImageAPI.fetchImage(wordSearch, page, KEY_API, per_page)
        .then(gallery => {
          if (gallery.hits.length === 0) {
            toast.error(`There are no pictures on demand ${wordSearch}`);
            return;
          } else {
            page > 1
              ? setGallery(stateGallery => [...stateGallery, ...gallery.hits])
              : setGallery(gallery.hits);
          }
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
    }, 2000);
  }, [page, wordSearch]);

  const handleButtonLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      {error && <h3 style={{ marginTop: 100 }}>{error.message}</h3>}
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
      {!isLoading && gallery.length !== 0 && gallery.length >= per_page && (
        <Button onClick={handleButtonLoadMore} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  wordSearch: PropTypes.string.isRequired,
};
