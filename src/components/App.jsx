import React from 'react';
import css from './App.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ProgressBar } from 'react-loader-spinner';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'Services/pixabayApi';

export class App extends React.Component {
  state = {
    query: '',
    page: 1,
    gallery: [],
    isLoading: false,
    showButtonLoadMore: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState({
        isLoading: true,
      });
      try {
        const response = await getImages({ q: query });

        const {
          data: { hits, totalHits },
          config: {
            params: { per_page },
          },
        } = response;

        if (totalHits) {
          this.setState({ gallery: hits });
        } else {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        if (totalHits > page * per_page) {
          this.setState({ showButtonLoadMore: true });
        }
      } catch (e) {
        Notify.failure(`Request failed`);
      } finally {
        this.setState({ isLoading: false });
      }
      return;
    }

    if (prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const response = await getImages({ q: query, page });
        const {
          data: { totalHits, hits },
          config: {
            params: { per_page },
          },
        } = response;

        if (totalHits <= page * per_page) {
          this.setState({ showButtonLoadMore: false });
          Notify.info("You've reached the end of search results.");
        }

        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...hits],
        }));
      } catch (e) {
        Notify.failure(`Request failed`);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmitSearch = query => {
    this.setState({ query, page: 1, gallery: [], showButtonLoadMore: false });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isLoading, showButtonLoadMore, gallery } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmitSearch} />

        {!!gallery.length && <ImageGallery gallery={gallery} />}

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
          <Button name="Load more" onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
