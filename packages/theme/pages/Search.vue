<template>
  <div>
    <p v-if="error">error</p>{{error}}

    <label>Text search</label>
    <input @input="setTextSearch" />

    <label>Page</label>
    <input @input="setPage" />

    <label>Per page</label>
    <input @input="setPerPage" />
    <div>
      <label>Sort</label>
      <input @input="setSort" />

    </div>

    <p v-if="!!loading">loading</p>
    <div
      class="container"
      v-else
    >
      <div class="facets-container">
        <div v-if="facets.color">
          <h3>Color</h3>
          <div
            v-for="color in facets.color.terms"
            :key="color.term"
          >
            <input
              type="checkbox"
              :id="color.term"
              :value="color.term"
              v-model="colorFacet"
            >
            <label :for="color.term"> {{color.term}} ({{color.productCount}})</label>

          </div>
        </div>
        <div v-if="facets.color">
          <h3>Size</h3>
          <div
            v-for="size in facets.size.terms"
            :key="size.term"
          >
            <input
              type="checkbox"
              :id="size.term"
              :value="size.term"
              v-model="sizeFacet"
            >
            <label :for="size.term"> {{size.term}} ({{size.productCount}})</label>

          </div>
        </div>
      </div>
      <div class="product-container">
        <div
          class="product"
          v-for="product in products"
          :key="product.id"
        >
          <h3>{{product.name.en}}</h3>
          <img
            :src="product.masterVariant.images[0].url"
            class="product-img"
          />

        </div>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import debounce from 'lodash.debounce';
import { useProductSearch } from '@vsf-devgurus/vsf-ct-rest-integration';
import { onSSR } from '@vue-storefront/core';
import { ref, watch } from '@vue/composition-api';

export default {
  transition: 'fade',
  name: 'SearchPage',
  methods: {},
  setup(props, context) {
    const {
      loading,
      error,
      products,
      search,
      facets,
      termSearch,
      filter,
      filterByQuery,
      filterByFacets,
      page,
      perPage,
      sortBy
    } = useProductSearch({
      language: 'en',
      perPage: 10,
      facet: [
        {
          name: 'variants.attributes.color.key',
          alias: 'color',
          countingProducts: true
        },
        {
          name: 'variants.attributes.commonSize.key',
          alias: 'size',
          countingProducts: true
        }
      ]
    });

    const _setTextSearch = (event) => {
      termSearch.value = event.target.value;
    };

    const setTextSearch = debounce(_setTextSearch, 500);

    const setPage = (event) => {
      page.value = event.target.value;
    };
    const setPerPage = (event) => {
      perPage.value = event.target.value;
    };

    const _setSort = (event) => {
      sortBy.value = event.target.value;
    };

    const setSort = debounce(_setSort, 500);

    const colorFacet = ref([]);
    const sizeFacet = ref([]);

    watch(colorFacet, (newValue) => {
      filter.color = newValue;
      filterByFacets.color = newValue;
    });
    watch(sizeFacet, (newValue) => {
      filter.size = newValue;
      filterByFacets.size = newValue;
    });

    onSSR(async () => {
      await search({});
    });

    return {
      loading,
      error,
      products,
      facets,
      filter,
      setTextSearch,
      colorFacet,
      sizeFacet,
      setPage,
      setPerPage,
      setSort
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
}
.facets-container {
  flex: 20%;
  display: flex;
  flex-direction: column;
  align-content: center;
}
.product-container {
  flex: 80%;
  display: flex;
  flex-wrap: wrap;
}
.product {
  flex: 20%;
  height: auto;
}
.product-img {
  width: 100px;
  height: auto;
}
</style>
