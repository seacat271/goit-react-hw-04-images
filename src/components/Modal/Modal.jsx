
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ReactComponent as CircleRight } from '../../icon/CircleRight.svg';
import { ReactComponent as CircleLeft } from '../../icon/CircleLeft.svg';
import { useState, useEffect} from 'react';
import {
  ModalTab,
  Overlay,
  TagsBox,
  TagsText,
  RightIconButton,
  LeftIconButton,
} from './Modal.styled';

const ModalRoot = document.querySelector('#modal-root');

const Modal = ({image, onClose, imagesList}) => {
const [showImage, setShowImage] = useState(image);
const {largeImageURL, tags} = showImage;

const handleKeyDown = event => {
  console.log(event)
  if (event.code === 'Escape') onClose();
};



useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);

  return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line
},[])

const handleBackDropClick = event => {
  if (event.currentTarget === event.target) onClose();
};

const onClickImage = step => {
  const IndexImage = imagesList
    .map(item => item.id)
    .indexOf(showImage.id);
  if (IndexImage + step < 0 || IndexImage + step > imagesList.length - 1)
    onClose();
  setShowImage(imagesList[IndexImage + step]);
};






    return createPortal(
      <Overlay onClick={handleBackDropClick}>
        <ModalTab>
          <img src={largeImageURL} alt={tags}/>

          <TagsBox>
            <TagsText>{tags}</TagsText>
          </TagsBox>
          <RightIconButton
            type="button"
            onClick={() => {
              onClickImage(1);
            }}
          >
            <CircleRight width="48" height="48" fill="lightgrey" />
          </RightIconButton>
          <LeftIconButton
            type="button"
            onClick={() => {
              onClickImage(-1);
            }}
          >
            <CircleLeft width="48" height="48" fill="lightgrey" />
          </LeftIconButton>
        </ModalTab>
      </Overlay>,
      ModalRoot
    )
}


export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imagesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
