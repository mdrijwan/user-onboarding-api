export const formatResponse = (statusCode: number, response: object) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(response, null, '\t'),
})
