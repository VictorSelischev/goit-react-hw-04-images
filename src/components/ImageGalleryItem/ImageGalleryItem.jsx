import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import { PropTypes } from 'prop-types';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <li className={css.galleryItem} onClick={toggleModal}>
      <img src={webformatURL} alt={tags} loading="lazy" />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};