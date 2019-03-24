import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import styles from './styles.scss';

const SearchInput = (props) => {
  const onSearch = (event) => {
    const { handleSearch } = props;
    handleSearch(event);
  };

  return (
    <Input.Search
      className={styles.inputSearch}
      placeholder="Search"
      enterButton
      onSearch={event => onSearch(event)}
    />
  );
};

SearchInput.propTypes = {
  handleSearch: PropTypes.func,
};

export default SearchInput;
