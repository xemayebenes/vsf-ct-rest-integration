import { FacetConfig } from './types';

export const buildFacet = (facetsArray: FacetConfig[]): string[] => {
  return facetsArray.map(
    (facet) =>
      `${facet.name} as ${facet.alias} ${
        facet.countingProducts ? 'counting products' : ''
      }`
  );
};

export const buildFacetToObject = (
  facetArray: FacetConfig[]
): Record<string, any[]> =>
  facetArray.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.alias]: []
    };
  }, {});

export const buildFilter = (
  facets: FacetConfig[],
  filters: Record<string, any[]>
): string[] => {
  return facets
    .filter((facet) => filters[facet.alias] && filters[facet.alias].length)
    .map((facet) => `${facet.name}:"${filters[facet.alias].join('","')}"`);
};
