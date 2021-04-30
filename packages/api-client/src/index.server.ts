import { apiClientFactory } from '@vue-storefront/core';
import searchProducts from './api/searchProducts';

import { createCommerceToolsConnection } from './helper/commercetools-connection';
import { RestConfig } from './types/setup';

const fetch = require('node-fetch');
const defaultSettings = {};

const onCreate = (settings) => {
  const defaultApi = {
    authHost: 'https://auth.us-central1.gcp.commercetools.com',
    uri: 'https://api.us-central1.gcp.commercetools.com',
    projectKey: '<project-key>',
    clientId: '<client-id>',
    clientSecret: '<client-secret>',
    scopes: []
  };

  const { api = defaultApi } = settings;

  const config = {
    commercetools: {
      auth: {
        host: api.authHost,
        projectKey: api.projectKey,
        credentials: {
          clientId: api.clientId,
          clientSecret: api.clientSecret
        },
        scopes: api.scopes,
        fetch
      },
      middleware: {
        host: api.uri,
        fetch
      }
    },
    concurrency: 10
  } as RestConfig;

  const { execute, getRequestBuilder } = createCommerceToolsConnection(config);

  return {
    config: {
      ...defaultSettings,
      ...settings
    },
    client: {
      execute,
      getRequestBuilder
    }
  };
};

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    searchProducts
  }
});

export { createApiClient };
