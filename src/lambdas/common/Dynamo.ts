import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

import Item from '../models/Item';

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

const db = new DocumentClient(options);

export const createItem = async (name: string): Promise<Item> => {
  if (!name) throw Error('There was no name in body');

  const item: Item = {
    id: uuidv4(),
    name,
    createdUtc: moment().utc().toISOString(),
  };

  const params: DocumentClient.PutItemInput = {
    TableName: process.env.tableName,
    Item: item,
  };

  const res = await db.put(params).promise();
  if (!res) {
    throw Error(`There was an error putting data into ${process.env.tableName}`);
  }

  return item;
};
