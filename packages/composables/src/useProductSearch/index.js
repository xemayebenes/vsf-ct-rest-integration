import { useVSFContext } from '@vue-storefront/core';
import { ssrRef, computed } from '@nuxtjs/composition-api';

const useProductSearch = () => {
  const context = useVSFContext();
  console.log('llega a useProductSearch invocation');
  const response = ssrRef({});
  const loading = ssrRef(false);
  const error = ssrRef(undefined);

  const search = async () => {
    console.log('llega a useProductSearch search');
    try {
      console.log(context.$ctRest);
      loading.value = true;
      response.value = await context.$ctRest.api.searchProducts({});
    } catch (err) {
      console.log('error', err);
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    search,
    limit: computed(() => response.value.limit),
    offset: computed(() => response.value.offset),
    count: computed(() => response.value.count),
    total: computed(() => response.value.total),
    facets: computed(() => response.value.facets),
    products: computed(() => response.value.results),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
export default useProductSearch;
