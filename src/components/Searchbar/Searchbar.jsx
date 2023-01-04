import { React, useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default function Searchbar(props) {
  const [inputValue, setInputValue] = useState('');

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(inputValue);
    handleReset();
  }

  function handleReset() {
    setInputValue('');
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchForm_button} type="submit">
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          onChange={handleChange}
          value={inputValue}
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  props: PropTypes.arrayOf(
    PropTypes.shape({
      formSubmitHandler: PropTypes.func.isRequired,
    })
  ),
};
