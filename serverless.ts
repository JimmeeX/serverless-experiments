import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless-test',
  },
  app: 'typescript-lambda-dynamodb-app',
  org: 'jimmeex',
  frameworkVersion: '2',
  custom: {
    tableName: 'cool-places-table',
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8000,
        inMemory: true, // Use Host Machine's ram
        migrate: true,
      },
      migration: {
        dir: 'offline/migrations', // Location of description of dynamodb
      },
    },
    // localstack: {
    //   stages: ['local'],
    //   host: 'http://localhost',
    //   edgePort: 4566,
    //   autostart: true,
    //   lambda: {
    //     mountCode: true
    //   },
    //   docker: {
    //     sudo: false
    //   },
    //   debug: true
    // }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-dynamodb-local'], // omitting serverless-localstack
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      tableName: 'cool-places-table',
    },
    region: "${opt:region, 'ap-southeast-2'}",
    stage: "${opt:stage, 'dev'}",
  },
  functions: {
    hello: {
      handler: 'lambdas/endpoints/sendHello.handler',
      events: [
        {
          http: {
            path: 'send-hello',
            method: 'get',
          },
        },
      ],
    },
    create: {
      handler: 'lambdas/endpoints/createPlace.handler',
      events: [
        {
          http: {
            path: 'create-place/{ID}',
            method: 'post',
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      kittensTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          // TableName: '${self:service}:${self:custom.tableName}-${self:provider.stage}',
          TableName: 'cool-places-table',
          AttributeDefinitions: [
            {
              AttributeName: 'ID',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'ID',
              KeyType: 'HASH',
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
