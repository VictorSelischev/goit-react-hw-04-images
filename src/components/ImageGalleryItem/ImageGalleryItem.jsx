import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { PropTypes } from 'prop-types';
import { Modal } from '../Modal/Modal';

class ImageGalleryItem extends Component {

  state = {
    showModal: false,
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  }

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    const { showModal } = this.state;

    return (
      <li className={css.galleryItem} onClick={this.toggleModal}>
        <img src={webformatURL} alt={tags} loading="lazy" />
        {showModal && <Modal largeImageURL={largeImageURL} tags={tags} onClose={this.toggleModal} />}
      </li>
    );
  }
}

export { ImageGalleryItem };

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
