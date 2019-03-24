/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styles from './styles.scss';

const Sort = (props) => {
  const { onSort, sort } = props;
  const handleSort = () => {
    // ascending
    if (!sort) return onSort('asc');
    // descending
    if (sort === 'asc') return onSort('desc');
    // disabled
    return onSort(null);
  };

  let iconType = 'sort-ascending';
  const iconStyle = {};

  if (sort === 'desc') iconType = 'sort-descending';
  // if it's active, add a background color
  if (sort) iconStyle.color = '#1d97c5';

  return (
    <div className={styles.wrapper} onClick={handleSort}>
      <span>Sort by job title:</span>
      <Icon style={iconStyle} type={iconType} className={styles.iconSort} />
    </div>
  );
};

Sort.propTypes = {
  onSort: PropTypes.func,
  sort: PropTypes.string,
};

export default Sort;
