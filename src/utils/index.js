/* eslint-disable camelcase */
import _ from 'lodash';

// searching in both job title and organization name
const filterResults = (jobs, string, sorting) => {
  let results = jobs;
  if (!_.isEmpty(string)) {
    results = results.filter(
      item => item.job_title.toLowerCase().includes(string.toLowerCase())
        || (item.organization_name
          && item.organization_name.toLowerCase().includes(string.toLowerCase())),
    );
  }

  if (sorting) {
    results.sort((a, b) => {
      if (a.job_title.toLowerCase() < b.job_title.toLowerCase()) return sorting === 'asc' ? -1 : 1;
      if (a.job_title.toLowerCase() > b.job_title.toLowerCase()) return sorting === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return results;
};

// generate a unique key for react mapping and localstorge identification
const generateUniqueKey = (job) => {
  const { job_title, organization_name, location_coordinates } = job;
  return `${job_title}-${organization_name}-${location_coordinates[0]}-${location_coordinates[1]}`
    .toLocaleLowerCase()
    .replace(/\s/g, '');
};

export { filterResults, generateUniqueKey };
