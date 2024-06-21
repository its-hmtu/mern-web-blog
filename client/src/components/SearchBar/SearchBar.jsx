import React, { useState } from 'react';

const SearchBar = (props) => {
  const { search } = useSearch();
  const [value, setValue] = useState('');

  // Handle input change for search bar
  const onInputChange = (evt) => {
    setValue(evt.target.value);
  };

  // Handle 'enter' press event
  const onEnterKey = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      search(value);
      setValue('');
    }
  };

  return (
    <input
      className={
        props.showSearchOnMobile ? 'search-bar--mobile ' : 'search-bar '
      }
      key='random1'
      value={value}
      placeholder={'Search...'}
      onChange={onInputChange}
      onKeyDown={onEnterKey}
    />
  );
};

export default SearchBar;
