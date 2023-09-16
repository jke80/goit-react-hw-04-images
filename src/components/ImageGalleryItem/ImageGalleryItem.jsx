import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';
export class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  handleClick = () => {
    this.setState({ showModal: true });
  };

  render() {
    const { url, tags, largeImageUrl } = this.props;
    const { showModal } = this.state;
    return (
      <li className={css.galleryItem}>
        <img
          className={css.galleryItemImage}
          onClick={this.handleClick}
          src={url}
          alt={tags}
        />
        {showModal && (
          <Modal
            url={largeImageUrl}
            tags={tags}
            onCloseModal={this.handleCloseModal}
          />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
};
