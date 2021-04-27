/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const searchProducts = async (context, params) => {
  console.log(searchProducts);
  const response = await context.client.execute({
    uri: context.client
      .getRequestBuilder()
      .productProjectionsSearch.parse({})
      .build(),
    method: 'GET'
  });
  console.log('response', response);
  return response.body;
};

export default searchProducts;
