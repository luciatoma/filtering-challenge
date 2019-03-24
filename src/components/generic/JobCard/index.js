/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';

import styles from './styles.scss';

const JobCard = (props) => {
  const {
    jobTitle, orgName, onDelete, onShowMap,
  } = props;
  return (
    <div className={styles.wrapper} onClick={onShowMap}>
      <div className={styles.content}>
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
      <Tooltip title="Delete job" placement="top" text>
        <Icon type="delete" className={styles.iconDelete} onClick={onDelete} />
      </Tooltip>
    </div>
  );
};

JobCard.propTypes = {
  jobTitle: PropTypes.string.isRequired,
  orgName: PropTypes.string,
  onDelete: PropTypes.func,
  onShowMap: PropTypes.func,
};

export default JobCard;
