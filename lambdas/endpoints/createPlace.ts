import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import 'source-map-support/register';

let options: ServiceConfigurationOptions = {};

// Offline Development
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: `http://${process.env.DYNAMODB_HOST || 'localhost'}:${
      process.env.DYNAMODB_PORT || 8000
    }`,
    accessKeyId: 'MOCK_ACCESS_KEY_ID',
    secretAccessKey: 'MOCK_SECRET_ACCESS_KEY',
  };
}

// Jest Testing
if (process.env.JEST_WORKER_ID) {
  options = {
    endpoint: 'http://localhost:8000',
    region: 'local-env',
    sslEnabled: false,
  };
}

const documentClient = new DocumentClient(options);

const params: DocumentClient.PutItemInput = {
  TableName: 'cool-places',
  Item: {
    ID: 'BYE',
  },
};

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  // console.log(event);
  // console.log(context);

  // console.log('TABLENAME', process.env.tableName);
  // const { id } = event.pathParameters;
  console.log(event.body);

  const res = await documentClient.put(params).promise();

  if (!res) {
    throw Error(`There was an error inserting ID into ${process.env.tableName}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Data inserted successfully',
      input: event,
    }),
  };
}
