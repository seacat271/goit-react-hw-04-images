import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ReactComponent as CircleRight } from '../../icon/CircleRight.svg';
import { ReactComponent as CircleLeft } from '../../icon/CircleLeft.svg';

import {
  ModalTab,
  Overlay,
  TagsBox,
  TagsText,
  RightIconButton,
  LeftIconButton,
} from './Modal.styled';
const ModalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  state = {
    showImage: this.props.image,
    isLoading: false,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  onClickImage = step => {
    const { imagesList, onClose } = this.props;
    const IndexImage = imagesList
      .map(item => item.id)
      .indexOf(this.state.showImage.id);
    if (IndexImage + step < 0 || IndexImage + step > imagesList.length - 1)
      onClose();
    this.setState({ showImage: imagesList[IndexImage + step] });
  };

  loadingImage = () => {
    this.setState({ isLoading: true });
  };

  render() {
    const {
      showImage: { largeImageURL, tags },
    } = this.state;
    return createPortal(
      <Overlay onClick={this.handleBackDropClick}>
        <ModalTab style={{ display: !this.state.isLoading ? "none" : "block" }}>
          <img src={largeImageURL} alt={tags} onLoad={this.loadingImage}/>

          <TagsBox>
            <TagsText>{tags}</TagsText>
          </TagsBox>
          <RightIconButton
            type="button"
            onClick={() => {
              this.onClickImage(1);
            }}
          >
            <CircleRight width="48" height="48" fill="lightgrey" />
          </RightIconButton>
          <LeftIconButton
            type="button"
            onClick={() => {
              this.onClickImage(-1);
            }}
          >
            <CircleLeft width="48" height="48" fill="lightgrey" />
          </LeftIconButton>
        </ModalTab>
      </Overlay>,
      ModalRoot
    );
  }
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
