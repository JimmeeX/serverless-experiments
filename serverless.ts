import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless-test',
  },
  app: 'typescript-lambda-dynamodb-app',
  org: 'jimmeex',
  frameworkVersion: '2',
  custom: {
    tableName: "cool-places",
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
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
  plugins: ['serverless-offline', 'serverless-webpack'], // omitting serverless-localstack
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    region: 'ap-southeast-2'
  },
  functions: {
    create: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      kittensTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:service}:${self:custom.tableName}-${opt:stage}',
          AttributeDefinitions: {
            AttributeName: 'ID',
            AttributeType: 'S'
          },
          KeySchema: {
            AttributeName: 'ID',
            KeyType: 'HASH'
          },
          BillingMode: 'PAY_PER_REQUEST'
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;
