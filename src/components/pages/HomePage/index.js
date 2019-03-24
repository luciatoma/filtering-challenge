/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Modal } from 'antd';
import ls from 'local-storage';

import styles from './styles.scss';
import { getJobs } from '../../../services/api';
import { filterResults, generateUniqueKey } from '../../../utils';
import Search from '../../generic/SearchInput';
import Sort from '../../generic/Sort';
import JobCard from '../../generic/JobCard';
import Map from '../../generic/Map';

const localStorageKey = 'deletedJobs';

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      allJobs: [],
      searchedString: '',
      deletedJobs: ls.get(localStorageKey) || [],
      shownOnMap: false,
      sorting: null,
    };

    this.mounted = false;
  }

  async componentDidMount() {
    this.mounted = true;
    const allJobs = await getJobs();

    // avoid jest error with "setState on unmounted component"
    if (this.mounted) this.setState({ allJobs });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleSearch = (string) => {
    const { searchedString } = this.state;
    // avoid unnecessary render if the user searches for the same string
    if (string !== searchedString) this.setState({ searchedString: string });
  };

  handleSort = sorting => this.setState({ sorting });

  handleDelete = (event, keyToDelete) => {
    const { deletedJobs } = this.state;
    // prevent the map from opening when clicking the delete button
    event.preventDefault();
    event.stopPropagation();
    if (deletedJobs.includes(keyToDelete)) return;
    const newDeletedJobs = [...deletedJobs, keyToDelete];
    this.setState({ deletedJobs: newDeletedJobs }, () => ls.set(localStorageKey, newDeletedJobs));
  };

  onShowMap = (job) => {
    this.setState({ shownOnMap: job });
  };

  modalTitle = job => (
    <div className={styles.modalTitle}>
      <span>
        <span className={styles.info}>Job Title:</span>
        {' '}
        {job.job_title}
      </span>
      <span>
        <span className={styles.info}>Organization Name:</span>
        {' '}
        {job.organization_name}
      </span>
    </div>
  );

  renderJobs = () => {
    const {
      allJobs, searchedString, deletedJobs, sorting,
    } = this.state;
    const isDeleted = (job) => {
      const jobKey = generateUniqueKey(job);
      return !deletedJobs.includes(jobKey);
    };

    const jobsWithoutDeleted = allJobs.filter(isDeleted);
    const results = filterResults(jobsWithoutDeleted, searchedString, sorting);

    return results.map(job => (
      <JobCard
        key={generateUniqueKey(job)}
        jobTitle={job.job_title}
        orgName={job.organization_name}
        onDelete={event => this.handleDelete(event, generateUniqueKey(job))}
        onShowMap={() => this.onShowMap(job)}
      />
    ));
  };

  render() {
    const { shownOnMap, sorting } = this.state;
    return (
      <div className={styles.wrapper}>
        <Search handleSearch={this.handleSearch} />
        <Sort sort={sorting} onSort={this.handleSort} />
        {this.renderJobs()}
        {shownOnMap && (
          <Modal
            className={styles.modal}
            title={this.modalTitle(shownOnMap)}
            visible
            centered
            onCancel={() => this.setState({ shownOnMap: null })}
          >
            <Map
              latitude={shownOnMap.location_coordinates[0]}
              longitude={shownOnMap.location_coordinates[1]}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default HomePage;
