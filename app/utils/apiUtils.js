import { create } from 'apisauce';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import upperCase from 'lodash/upperCase';
import { mapKeysDeep } from './index';

const APIs = { GITHUB_URL: process.env.GITHUB_URL, ITUNES_URL: process.env.ITUNES_URL };

const apiClients = {
  github: null,
  default: null,
  itunes: null
};

const generateApiUrl = type => {
  const envKey = `${upperCase(type)}_URL`;
  return APIs[envKey];
};
export const getApiClient = (type = 'github') => {
  return apiClients[type];
};
export const generateApiClient = (type = 'github') => {
  const API_URL = generateApiUrl(type);
  if (Object.keys(apiClients).includes(type)) {
    apiClients[type] = createApiClientWithTransForm(API_URL);
    return apiClients[type];
  } else {
    apiClients.default = createApiClientWithTransForm(API_URL);
    return apiClients.default;
  }
};

export const createApiClientWithTransForm = baseURL => {
  const api = create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
  });
  api.addResponseTransform(response => {
    const { ok, data } = response;
    if (ok && data) {
      response.data = mapKeysDeep(data, keys => camelCase(keys));
    }
    return response;
  });

  api.addRequestTransform(request => {
    const { data } = request;
    if (data) {
      request.data = mapKeysDeep(data, keys => snakeCase(keys));
    }
    return request;
  });
  return api;
};
