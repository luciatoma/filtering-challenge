/* eslint-disable camelcase */
import React, { Component } from 'react';
import ls from 'local-storage';

import { getJobs } from '../../../services/api';
import { filterResults, generateUniqueKey } from '../../../utils';
import Search from '../../generic/SearchInput';
import JobCard from '../../generic/JobCard';

const localStorageKey = 'deletedJobs';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allJobs: [],
      searchedString: '',
      deletedJobs: ls.get(localStorageKey) || [],
    };
  }

  componentDidMount() {
    getJobs().then((jobs) => {
      this.setState({ allJobs: jobs });
    });
  }

  handleSearch = (string) => {
    const { searchedString } = this.state;
    // avoid unnecessary render if the user searches for the same string
    if (string !== searchedString) this.setState({ searchedString: string });
  };

  handleDelete = (keyToDelete) => {
    const { deletedJobs } = this.state;
    if (deletedJobs.includes(keyToDelete)) return;
    const newDeletedJobs = [...deletedJobs, keyToDelete];
    this.setState({ deletedJobs: newDeletedJobs }, () => ls.set(localStorageKey, newDeletedJobs));
  };

  renderJobs = () => {
    const { allJobs, searchedString, deletedJobs } = this.state;
    const isDeleted = (job) => {
      const jobKey = generateUniqueKey(job);
      return !deletedJobs.includes(jobKey);
    };

    const jobsWithoutDeleted = allJobs.filter(isDeleted);
    const results = filterResults(jobsWithoutDeleted, searchedString);

    return results.map(job => (
      <JobCard
        key={generateUniqueKey(job)}
        jobTitle={job.job_title}
        orgName={job.organization_name}
        onDelete={() => this.handleDelete(generateUniqueKey(job))}
      />
    ));
  };

  render() {
    return (
      <div>
        <Search handleSearch={this.handleSearch} />
        {this.renderJobs()}
      </div>
    );
  }
}

export default HomePage;
