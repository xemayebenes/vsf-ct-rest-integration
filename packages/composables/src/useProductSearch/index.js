import { generateContext, vsfRef } from '@vue-storefront/core';
import { ssrRef, ref, computed } from '@nuxtjs/composition-api';

const useProductSearch = () => {
  const context = generateContext();

  const response = ssrRef({});
  const loading = ssrRef(false);
  const error = ssrRef(undefined);

  const search = async (id) => {
    try {
      loading.value = true;
      response.value = await context.$ctRest.searchProducts({});
    } catch (err) {
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
