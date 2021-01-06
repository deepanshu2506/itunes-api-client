import { generateApiClient } from '@utils/apiUtils';
const iTunesApi = generateApiClient('itunes');

export const getTracks = searchTerm => iTunesApi.get(`/search?term=${searchTerm}`);
