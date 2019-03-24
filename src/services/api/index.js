import jobs from './jobs';

const getJobs = () => Promise.resolve(jobs);

// eslint-disable-next-line import/prefer-default-export
export { getJobs };
