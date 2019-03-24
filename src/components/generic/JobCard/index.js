import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const JobCard = (props) => {
  const { jobTitle, orgName } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <span className={styles.info}>Job title:</span>
        {' '}
        <span>{jobTitle}</span>
      </div>
      <div className={styles.subtitleWrapper}>
        <span className={styles.info}>Organization name:</span>
        {' '}
        <span className={styles.subtitle}>{orgName}</span>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  jobTitle: PropTypes.string.isRequired,
  orgName: PropTypes.string,
};

export default JobCard;
