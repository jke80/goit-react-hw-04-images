import React, { useEffect, useState, useRef } from 'react';
import css from './App.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ProgressBar } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'Services/pixabayApi';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const galleryRef = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showButtonLoadMore, setShowButtonLoadMore] = useState(false);

  useEffect(() => {
    if (query) {
      fetchData({ query, page });
    }

    async function fetchData({ query, page }) {
      setIsLoading(true);
      try {
        const response = await getImages({ query, page });
        const {
          data: { hits, totalHits },
          config: {
            params: { per_page },
          },
        } = response;

        if (totalHits) {
          const newGallery = [...galleryRef.current, ...hits];
          galleryRef.current = newGallery;
        } else {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (totalHits > page * per_page) {
          setShowButtonLoadMore(true);
        }
        if (totalHits && totalHits <= page * per_page) {
          setShowButtonLoadMore(false);
          Notify.info("You've reached the end of search results.");
        }
      } catch (error) {
        Notify.failure(`Request failed`, error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [query, page]);

  const handleSubmitSearch = query => {
    setQuery(query);
    setPage(1);
    galleryRef.current = [];
    setShowButtonLoadMore(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmitSearch} />

      {!!galleryRef.current.length && (
        <ImageGallery gallery={galleryRef.current} />
      )}

      {isLoading && (
        <div className={css.progressBarContainer}>
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#3f51b5"
            barColor="#51E5FF"
          />
        </div>
      )}

      {!isLoading && showButtonLoadMore && (
        <Button name="Load more" onClick={handleLoadMore} />
      )}
    </div>
  );
};
