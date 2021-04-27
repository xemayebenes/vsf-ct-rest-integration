import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import searchProducts from './api/searchProducts';

const { createClient } = require('@commercetools/sdk-client');
const {
  createAuthMiddlewareForClientCredentialsFlow
} = require('@commercetools/sdk-middleware-auth');
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http');
const {
  createQueueMiddleware
} = require('@commercetools/sdk-middleware-queue');
const { createRequestBuilder } = require('@commercetools/api-request-builder');

const fetch = require('node-fetch');

const defaultSettings = {};

const onCreate = (settings) => {
  const config = {
    commercetools: {
      auth: {
        host: 'https://auth.us-central1.gcp.commercetools.com',
        projectKey: 'vsf-test',
        credentials: {
          clientId: '1fSSHos3RtVEq_1u6MxluPHU',
          clientSecret: '46BDvgKQEizlrDfsAxp0gNW2W2aA2PDP'
        },
        fetch
      },
      middleware: {
        host: 'https://api.us-central1.gcp.commercetools.com',
        fetch
      }
    },
    concurrency: 10
  };
  const { commercetools, concurrency } = config;
  const { auth, middleware } = commercetools;

  const middlewares = [
    createAuthMiddlewareForClientCredentialsFlow(auth),
    createQueueMiddleware({ concurrency: concurrency || 10 }),
    createHttpMiddleware(middleware)
  ];

  const client = createClient({
    middlewares
  });

  const execute = async (request) => {
    try {
      return await client.execute(request);
    } catch (err) {
      if (typeof err === 'object') {
        // eslint-disable-next-line
        const { headers, ...error } = err;
        throw error;
      }
      throw err;
    }
  };

  const getRequestBuilder = () => {
    return createRequestBuilder({
      projectKey: auth.projectKey,
      customServices: {}
    });
  };

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
    getProduct,
    getCategory,
    searchProducts
  }
});

export { createApiClient };
