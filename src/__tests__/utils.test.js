import { filterResults, generateUniqueKey } from '../utils';

const mockData = [
  {
    job_title: 'NOCTURNIST needed - Southern New Hampshire - Lucrative opportunity (Bedford)',
    organization_name: 'Enterprise Medical Services',
    location_coordinates: ['42.94647', '-71.5159'],
  },
  {
    job_title: 'Home Appliance Service Technician - Huntington Station',
    organization_name: 'Sears',
    location_coordinates: ['40.85343', '-73.41151'],
  },
];

it('filters results', () => {
  const filtered = filterResults(mockData, 'home');
  expect(filtered).toHaveLength(1);
  expect(filtered[0].organization_name).toBe('Sears');
});

it('sorts results', () => {
  const filtered = filterResults(mockData, '', 'asc');
  expect(filtered).toHaveLength(2);
  expect(filtered[0].organization_name).toBe('Sears');
});

it('generates unique key correctly', () => {
  const key = generateUniqueKey(mockData[1]);
  expect(key).toBe('homeapplianceservicetechnician-huntingtonstation-sears-40.85343--73.41151');
});
