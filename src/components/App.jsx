import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import ButtonLoadMore from './Button/Button';
import Spinner from 'components/Loader/Loader';
import { AppBox } from './App.styled';
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(null);
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const onSearchSubmit = event => {
    const { target } = event;
    event.preventDefault();
    if (target.query.value.trim() === '') return;
    setQuery(target.query.value.toLowerCase().trim());
    setPage(1);
    setImages([]);
    target.reset();
  };

  const openModal = image => {
    setShowModal(image);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const handleLoadMore = () => setPage(prevPage => prevPage + 1);

  const FetchAPI = async (page, query) => {
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

  // window.scrollBy({
  //   top: window.innerHeight - 76,
  //   behavior: 'smooth',
  // });

  useEffect(() => {

    if(query === "") return
    FetchAPI(page, query)
      .then(images => {
        setImages(prevImages => [...prevImages, ...images.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    setStatus('pending');
  }, [query, page]);

  // window.scrollTo({
  //   top: snapshot - 200,
  //   behavior: 'smooth',
  // });

  return (
    <AppBox>
      <Searchbar onSearchSubmit={onSearchSubmit} />
      {(status === 'resolved' || status === 'pending') && (
        <ImageGallery openModal={openModal} images={images} />
      )}
      {showModal && (
        <Modal
          onClose={closeModal}
          image={showModal}
          imagesList={images}
        ></Modal>
      )}
      {status === 'rejected' && <h1>{error.message}</h1>}
      {status === 'pending' && <Spinner />}
      {images.length > 0 && <ButtonLoadMore handleLoadMore={handleLoadMore} />}
    </AppBox>
  );
};
