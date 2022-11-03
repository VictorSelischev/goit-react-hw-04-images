import { useState } from 'react';
import css from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Searchbar = ({ onSubmitProp }) => {
  const [name, setName] = useState('');

  const handleChange = evt => {
    const { value } = evt.target;
    setName(value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (name.trim() === '') {
      toast.error('Enter text to search');
      return;
    }
    onSubmitProp(name);
    setName('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <SearchIcon />
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          name="name"
          value={name}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmitProp: PropTypes.func.isRequired,
};
