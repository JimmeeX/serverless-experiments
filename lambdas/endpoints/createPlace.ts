import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

let options: ServiceConfigurationOptions = {};

// Offline Development
if (process.env.IS_OFFLINE) {
  options = {
    endpoint: 'http://localhost:8000',
    region: 'localhost',
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
  TableName: 'cool-places-table',
  Item: {
    ID: 'HELLO_POO',
  },
};

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  // console.log(event);
  // console.log(context);

  // console.log('TABLENAME', process.env.tableName);

  console.log(process.env);

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
