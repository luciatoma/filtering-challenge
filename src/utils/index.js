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

// eslint-disable-next-line import/prefer-default-export
export { filterResults };
