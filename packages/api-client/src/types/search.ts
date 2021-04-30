export interface TextSearchParam {
  language: string;
  value: string;
}

export interface SortParam {
  sortBy: string;
  direction: string;
}

export interface SearchProductsParams {
  text: TextSearchParam;
  fuzzy: boolean;
  fuzzyLevel: string;
  facet: string[];
  staged: boolean;
  markMatchingVariants: boolean;
  priceCurrency: string;
  priceCountry: string;
  priceCustomerGroup: string;
  priceChannel: string;
  expand: string[];
  sort: SortParam[];
  sortBy: string;
  sortDirection: string;
  filter: string[];
  filterByQuery: string[];
  filterByFacets: string[];
  page: string;
  perPage: string;
}
