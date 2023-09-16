import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ gallery }) => {
  return (
    <ul className={css.gallery}>
      {gallery.map(galleryItem => {
        return (
          <ImageGalleryItem
            key={galleryItem.id}
            url={galleryItem.webformatURL}
            tags={galleryItem.tags}
            largeImageUrl={galleryItem.largeImageURL}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(PropTypes.object).isRequired,
};
