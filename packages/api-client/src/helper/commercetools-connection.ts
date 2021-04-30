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

import { RestConfig } from '../types/setup';

const createCommerceToolsConnection = (config: RestConfig): any => {
  const { commercetools, concurrency } = config;
  const { auth, middleware } = commercetools;

  const middlewares = [
    createAuthMiddlewareForClientCredentialsFlow(auth),
    createQueueMiddleware({
      concurrency: concurrency || 10
    }),
    createHttpMiddleware({ ...middleware, fetch })
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
    client,
    execute,
    getRequestBuilder
  };
};

export { createCommerceToolsConnection };
