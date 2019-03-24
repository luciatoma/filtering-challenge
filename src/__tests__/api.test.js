import { getJobs } from '../services/api';

it('gets jobs from API', async () => {
  const jobs = await getJobs();
  expect(jobs).toBeInstanceOf(Array);
  expect(jobs[0]).toMatchObject({
    job_title: expect.any(String),
    organization_name: expect.any(String),
    location_coordinates: expect.any(Array),
  });
});
