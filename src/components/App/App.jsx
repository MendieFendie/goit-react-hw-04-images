import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { Audio } from 'react-loader-spinner';
import css from './App.module.css';
import Modal from 'components/Modal/Modal';

const API_KEY = '30907588-7c59c046d485207ae743f1a8b';

export function App() {
  const [pictures, setPictures] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [error, setError] = useState(null);

  function formSubmitHandler(data) {
    if (searchValue !== data) {
      setSearchValue(data);
      setCurrentPage(1);
      setPictures([]);
    }
  }

  function loadMore() {
    setCurrentPage(Number(currentPage) + 1);
  }

  function closeModal(e) {
    if (e.target.className === 'Modal_Overlay__yoxbg' || e.code === 'Escape') {
      e.preventDefault();
      setShowModal(!showModal);
    }
  }

  function openModal(e) {
    const targetImg = e.target.dataset.id;
    if (targetImg) {
      const targetElem = pictures.find(elem => elem.id === Number(targetImg));
      const webUrl = targetElem.webformatURL;
      setImgUrl(webUrl);
      setShowModal(!showModal);
    }
  }

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${searchValue}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        setPictures(prev => [...prev, ...response.data.hits]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [currentPage, searchValue]);

  return (
    <div className={css.App}>
      {error && <h1>{error.massage}</h1>}
      <Searchbar onSubmit={formSubmitHandler} />
      {pictures.length !== 0 && (
        <ImageGallery pictures={pictures} openModal={openModal} />
      )}
      {loading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="loading"
          wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
          wrapperClass
        />
      )}
      {pictures.length > 0 && <Button onLoad={loadMore} />}
      {showModal && (
        <Modal closeModal={closeModal} imgUrl={imgUrl} showModal={showModal} />
      )}
    </div>
  );
}
