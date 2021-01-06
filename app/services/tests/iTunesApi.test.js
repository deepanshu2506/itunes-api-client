import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getTracks } from '../iTunesApi';

describe('iTunesApi tests', () => {
  const searchTerm = 'test';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient('itunes').axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ searchTerm }]
      }
    ];
    mock.onGet(`/search?term=${searchTerm}`).reply(200, data);
    const res = await getTracks(searchTerm);
    expect(res.data).toEqual(data);
  });
});
