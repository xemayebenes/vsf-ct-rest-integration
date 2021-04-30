import { useVSFContext } from '@vue-storefront/core';
import { ssrRef, computed, watch } from '@nuxtjs/composition-api';
import { reactive } from '@vue/composition-api';
import cloneDeep from 'lodash.clonedeep';

import { ProductSearchInitConfig, UseProductSearch } from './types';
import { buildFacet, buildFacetToObject, buildFilter } from './utils';

const useProductSearch = ({
  language: initialLanguage,
  perPage: initialPerPage = 20,
  facet = []
}: ProductSearchInitConfig): UseProductSearch => {
  const context = useVSFContext();

  const response: any = ssrRef({});
  const loading = ssrRef(false);
  const error = ssrRef(undefined);

  const language = ssrRef(initialLanguage);
  const perPage = ssrRef(initialPerPage);
  const page = ssrRef(1);
  const termSearch = ssrRef(undefined);

  const sortBy = ssrRef(undefined);

  const filter = reactive(buildFacetToObject(facet));
  const filterByQuery = reactive(buildFacetToObject(facet));
  const filterByFacets = reactive(buildFacetToObject(facet));

  const search = async ({
    term,
    filter,
    filterByQuery,
    filterByFacets,
    sortBy,
    page,
    perPage
  }): Promise<any> => {
    const query = {
      perPage,
      page,
      facet: buildFacet(facet),
      filter,
      filterByQuery,
      filterByFacets,
      sortBy,
      ...(term && { text: { language: language.value, value: term } })
    };

    try {
      loading.value = true;
      error.value = undefined;
      response.value = await context.$ctRest.api.searchProducts(query);
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  watch(
    [
      termSearch,
      () => cloneDeep(filter),
      () => cloneDeep(filterByQuery),
      () => cloneDeep(filterByFacets),
      page,
      perPage,
      sortBy
    ],
    async (newValues: any) => {
      await search({
        term: newValues[0],
        filter: buildFilter(facet, newValues[1]),
        filterByQuery: buildFilter(facet, newValues[2]),
        filterByFacets: buildFilter(facet, newValues[3]),
        page: newValues[4],
        perPage: newValues[5],
        sortBy: newValues[6]
      });
    }
  );

  return {
    search,
    termSearch,
    filter,
    filterByFacets,
    filterByQuery,
    page,
    perPage,
    sortBy,
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
