/* eslint-disable camelcase */
import _ from 'lodash';

// searching in both job title and organization name
const filterResults = (jobs, string) => {
  let results = jobs;
  if (!_.isEmpty(string)) {
    results = results.filter(
      item => item.job_title.toLowerCase().includes(string.toLowerCase())
        || (item.organization_name
          && item.organization_name.toLowerCase().includes(string.toLowerCase())),
    );
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
