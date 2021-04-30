# Vue StoreFront commercetools rest integration

> **Disclaimer:** This project is still in beta phase.

This repository is a vue storefront commercetools integration for the [REST API](https://docs.commercetools.com/api/)

The main goal of the repository is to extend the offical [commercetools integration](https://docs.vuestorefront.io/v2/commercetools/) with REST capabilities that are not possible with the GraphQL API.

These capabilities are:

- [**PRODUCT PROJECTION SEARCH**](https://docs.commercetools.com/api/projects/products-search)

This repository is a monorepo containing three projects:

- **api-client** - communicates with commercetools backend;
- **composables** - exposes composable functions used to retrieve data using `api-client`;
- **theme** - `nuxt` project that glues everything together. It extends our core theme and uses `composables` to retrieve data. For this particular integration, only sample code for the use of composables is provided.

## How to start?

1. Install all required dependencies:

```sh
yarn install
```

2. (optional) Then you can verify if everything works properly by building all three projects:

```sh
yarn build
```

4. If everything built properly, you can run the code with:

```sh
yarn dev
```

## How to use?

1. Create a vue storefront commercetools integration project. [Documentation](https://docs.vuestorefront.io/v2/commercetools/getting-started.html)

2. Install the dependency

```sh
yarn add @vsf-devgurus/vsf-ct-rest-integration
```

3. Configure the integration in the middleware.config.js file

```js
ctRest: {
      location: "@vsf-devgurus/vsf-ct-rest-integration-api/server",
      configuration: {
        api: {
          uri: "https://api.us-central1.gcp.commercetools.com",
          authHost: "https://auth.us-central1.gcp.commercetools.com",
          projectKey: <project-key>,
          clientId: <client-id>,
          clientSecret: <client-secret>,
          scopes: <client-scopes>
        }
      }
    }
```

4. Use the composables exposed

- [useProductSearch](./packages/composables/src/useProductSearch)
  Example [here](./packages/theme/pages/Search.vue)
