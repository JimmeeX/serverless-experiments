import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import 'source-map-support/register';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const hello = 'HELLO';
  console.log(hello);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2,
    ),
  };
}
