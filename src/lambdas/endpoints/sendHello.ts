import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import Response from '../common/Response';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return new Response({ statusCode: 200, body: { message: 'Hello!', input: event } });
};
