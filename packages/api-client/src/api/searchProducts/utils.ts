import { SearchProductsParams } from '../../types/search';

const defaultSorts = [
  { by: 'score', direction: 'asc' },
  { by: 'id', direction: 'asc' }
];

const getSortSearchQueryParam = (
  { sort = [], sortBy, sortDirection = 'asc' } = {
    sort: [],
    sortDirection: 'asc',
    sortBy: undefined
  }
) => {
  if (sortBy) {
    sort.push({ by: sortBy, direction: sortDirection });
  }
  return [...sort, ...defaultSorts];
};

const getFilterQueryParams = (
  { filter, filterByQuery, filterByFacets } = {
    filter: undefined,
    filterByQuery: undefined,
    filterByFacets: undefined
  }
) => ({
  filter: [...(filter && filter.length ? filter : [])],
  filterByQuery: [
    ...(filterByQuery && filterByQuery.length ? filterByQuery : [])
  ],
  filterByFacets: [
    ...(filterByFacets && filterByFacets.length ? filterByFacets : [])
  ]
});

const getPaginationParams = (
  { page, perPage } = { page: undefined, perPage: undefined }
) => ({
  ...(page && { page: parseInt(page, 10) }),
  ...(perPage && { perPage: parseInt(perPage, 10) })
});

export const getSearchQueryParams = (query: SearchProductsParams): any => {
  const {
    text,
    fuzzy,
    fuzzyLevel,
    facet,
    staged,
    markMatchingVariants,
    priceCurrency,
    priceCountry,
    priceCustomerGroup,
    priceChannel,
    expand
  } = query || {};
  return {
    ...(text && { text }),
    ...(fuzzy !== undefined && { fuzzy }),
    ...(fuzzyLevel !== undefined && {
      fuzzyLevel: parseInt(fuzzyLevel, 10)
    }),
    ...getFilterQueryParams(query),
    facet: [...(facet && facet.length ? facet : [])],
    sort: getSortSearchQueryParam(query),
    ...getPaginationParams(query),
    ...(staged !== undefined && { staged }),
    ...(markMatchingVariants !== undefined && { markMatchingVariants }),
    ...(priceCurrency && { priceCurrency }),
    ...(priceCountry && { priceCountry }),
    ...(priceCustomerGroup && { priceCustomerGroup }),
    ...(priceChannel && { priceChannel }),
    expand: [...(expand && expand.length ? expand : [])]
  };
};
