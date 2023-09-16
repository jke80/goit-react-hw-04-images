import React from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends React.Component {
  state = {
    inputValue: '',
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ inputValue: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { inputValue } = this.state;

    if (inputValue) {
      onSubmit(inputValue);

      this.setState({ inputValue: '' });

      event.currentTarget.reset();
    }
  };

  render() {
    const { inputValue } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={inputValue}
          />
        </form>
      </header>
    );
  }
}
