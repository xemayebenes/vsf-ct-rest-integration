<template>
  <div>
    <p>loading</p>{{loading}}
    <p>error</p>{{error}}
    <p>products:</p>{{products[0].id}}

  </div>
</template>

<script>
import { useProductSearch } from '@vue-storefront/ctRest';
console.log('aqui', useProductSearch);
import { onSSR } from '@vue-storefront/core';

export default {
  transition: 'fade',
  name: 'SearchPage',
  setup(props, context) {
    const { loading, error, products, search } = useProductSearch();

    onSSR(async () => {
      await search();
    });

    return {
      loading,
      error,
      products
    };
  }
};
</script>

<style>
</style>
