/* eslint-disable camelcase */
import React, { Component } from 'react';

import { getJobs } from '../../../services/api';
import { filterResults } from '../../../utils';
import Search from '../../generic/SearchInput';
import JobCard from '../../generic/JobCard';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allJobs: [],
      searchedString: '',
    };
  }

  componentDidMount() {
    getJobs().then(allJobs => this.setState({ allJobs }));
  }

  handleSearch = (string) => {
    const { searchedString } = this.state;
    // avoid unnecessary render if the user searches for the same string
    if (string !== searchedString) this.setState({ searchedString: string });
  };

  render() {
    const { allJobs, searchedString } = this.state;

    const results = filterResults(allJobs, searchedString);

    return (
      <div>
        <Search handleSearch={this.handleSearch} />
        {results.map(({ job_title, organization_name }) => (
          <JobCard jobTitle={job_title} orgName={organization_name} />
        ))}
      </div>
    );
  }
}

export default HomePage;
