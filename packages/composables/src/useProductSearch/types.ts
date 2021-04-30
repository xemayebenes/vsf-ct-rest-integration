/* eslint-disable @typescript-eslint/ban-types */
import { ComputedRef, Ref } from '@vue/composition-api';
export interface FacetConfig {
  name: string;
  alias: string;
  countingProducts: boolean;
}
export interface ProductSearchInitConfig {
  language: string;
  perPage: number;
  facet: FacetConfig[];
}

export interface UseProductSearch {
  search: any;
  termSearch: Ref<string>;
  filter: object;
  filterByFacets: object;
  filterByQuery: object;
  limit: ComputedRef<number>;
  offset: ComputedRef<number>;
  count: ComputedRef<number>;
  total: ComputedRef<number>;
  facets: ComputedRef;
  products: ComputedRef;
  loading: ComputedRef<boolean>;
  error: ComputedRef;
  page: ComputedRef<number>;
  perPage: ComputedRef<number>;
  sortBy: ComputedRef<string>;
}
