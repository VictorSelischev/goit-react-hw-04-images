import { useEffect } from 'react';
import css from './Modal.module.css';
import { PropTypes } from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, tags, onClose }) => {
  const handleKeyDownEscape = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownEscape);

    return () => {
      window.removeEventListener('keydown', handleKeyDownEscape);
    };
  });

  const handleBackdropClick = evt => {
    if (evt.currentTarget !== evt.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modalWindow}>
        <img src={largeImageURL} alt={tags} loading="lazy" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
