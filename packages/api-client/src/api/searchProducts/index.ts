/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getSearchQueryParams } from './utils';
import { SearchProductsParams } from '../../types/search';

const searchProducts = async (
  context: any,
  params: SearchProductsParams
): Promise<any> => {
  try {
    const response = await context.client.execute({
      uri: context.client
        .getRequestBuilder()
        .productProjectionsSearch.parse(getSearchQueryParams(params))
        .build(),
      method: 'GET'
    });
    return response.body;
  } catch (error) {
    console.log('Error searching products');
    console.log(error);
    throw error;
  }
};

export default searchProducts;
