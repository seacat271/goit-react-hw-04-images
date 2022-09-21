import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images, openModal }) => {
  return (
    <Gallery>
      {images.map((image, index) => (
        <ImageGalleryItem image={image} key={index} openModal={openModal} />
      ))}
    </Gallery>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
