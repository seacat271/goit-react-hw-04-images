import { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import ButtonLoadMore from './Button/Button';
import Spinner from 'components/Loader/Loader';
import { AppBox } from './App.styled';

export class App extends Component {
  state = {
    // index: 0,
    query: '',
    showModal: null,
    status: 'idle',
    images: [],
    page: 1,
    error: null,
  };

  getSnapshotBeforeUpdate() {
    return  document.body.clientHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {query, page} = this.state;
    if (
      prevState.query !== query ||
      prevState.page !== page
    ) {
      this.setState({ status: 'pending' });
      this.FetchAPI(this.state)
        .then(images => {
          if (prevState.query !== query) {
            this.setState({ images: images.hits, status: 'resolved' });
          } else {
            this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              status: 'resolved',
            }));
          }
        })
        .catch(error => this.setState({ error, statue: 'rejected' }));
    }
    // window.scrollTo({
    //   top: snapshot - 200,
    //   behavior: 'smooth',
    // });

    window.scrollBy({
      top: window.innerHeight - 76,
      behavior: "smooth",
    });


  }

  FetchAPI = async ({ page, query }) => {
    const BASE_URL = 'https://pixabay.com/api/';
    const requestConfig = {
      params: {
        key: '29127762-27ecb80fc89c6fc72c273a026',
        per_page: 12,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        q: query,
      },
    };
    const response = await axios.get(BASE_URL, requestConfig);
    return response.data;
  };

  onSearchSubmit = event => {
    const {target} = event
    event.preventDefault();
    if (target.query.value.trim() === '') return;
    this.setState({
      query: target.query.value.toLowerCase().trim(),
      page: 1,
      images: [],
    });
    target.reset();
  };

  openModal = image => {
    this.setState({ showModal: image });
  };

  closeModal = () => {
    this.setState({ showModal: null });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { showModal, images, status, error } = this.state;
    return (
      <AppBox>
        <Searchbar onSearchSubmit={this.onSearchSubmit} />
        {(status === 'resolved' ||
          status === 'pending') && (
          <ImageGallery openModal={this.openModal} images={images} />
        )}
        {showModal && (
          <Modal
            onClose={this.closeModal}
            image={showModal}
            imagesList = {images}
          ></Modal>
        )}
        {status === 'rejected' && (
          <h1>{error.message}</h1>
        )}
        {status === 'pending' && <Spinner/>}
        {images.length > 0 && (
          <ButtonLoadMore handleLoadMore={this.handleLoadMore} />
        )}
      </AppBox>
    );
  }
}
