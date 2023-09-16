import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ url, tags, largeImageUrl }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryItemImage}
        onClick={handleClick}
        src={url}
        alt={tags}
      />
      {showModal && (
        <Modal
          url={largeImageUrl}
          tags={tags}
          onCloseModal={handleCloseModal}
        />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
