import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';

import Response from '../common/Response';
import { createItem } from '../common/Dynamo';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const place = JSON.parse(event.body);
  const { name } = place;

  try {
    const item = await createItem(name);
    return new Response({ statusCode: 200, body: item });
  } catch (err) {
    console.log(err);
    return new Response({
      statusCode: 400,
      body: { message: err.message },
    });
  }
};
