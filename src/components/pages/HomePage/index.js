/* eslint-disable camelcase */
import React, { Component } from 'react';
import { getJobs } from '../../../services/api';

import JobCard from '../../generic/JobCard';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
    };
  }

  componentDidMount() {
    getJobs().then((jobs) => {
      this.setState({ jobs });
    });
  }

  render() {
    const { jobs } = this.state;
    console.log('jobs', jobs);
    return (
      <div>
        {jobs.map(({ job_title, organization_name }) => (
          <JobCard jobTitle={job_title} orgName={organization_name} />
        ))}
      </div>
    );
  }
}

export default HomePage;
