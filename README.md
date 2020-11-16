# Serverless Experiments

Learning about [serverless](https://www.serverless.com/) :)

## Serverless Stack

- AWS API Gateway
- AWS Lambda (w/ TypeScript)
- AWS DynamoDB

## Dev Tools

- Local Dynamodb GUI Client - [NoSQL Workbench for Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)
- Docker

## Features

- Local development using [serverless-offline](https://github.com/dherault/serverless-offline) and [serverless-dynamodb-local](https://github.com/99x/serverless-dynamodb-local).
- A failed attempt at [localstack](https://github.com/localstack/localstack) integration

## Reqs

- Java8 (to locally use serverless-dynamodb-local)

## TODOs

- Debugging Configuration w/ Docker
- [Object object] environmental variable issues
- Auth w/ cognito or aws-amplify?
- CI/CD
- Jest Integration

## Development

1. Run Docker.

   ```bash
   docker-compose up --build
   ```

2. If changes are made to Dynamodb, make the migrations (in a separate terminal while docker-compose up is running).

   ```bash
   docker exec -it serverless-test_api_1 /bin/sh
   sls dynamodb migrate
   ```

## Learning Resources

- [The Serverless Framework with AWS Playlist](https://www.youtube.com/watch?v=D5_FHbdsjRc&list=PLmexTtcbIn_gP8bpsUsHfv-58KsKPsGEo)
- [Academind Serverless Course](https://pro.academind.com/p/aws-serverless-apis-apps-a-complete-introduction)
- [Webinar - Getting started with the serverless framework](https://www.youtube.com/watch?v=LXB2Nv9ygQc)
- [Sample Github Project by jch254](https://github.com/jch254/serverless-node-dynamodb-api)
- [Get Started With AWS, Serverless, and TypeScript Article](https://dev.to/michael_timbs/get-started-with-aws-serverless-and-typescript-5hgf)
- [Using Docker Compose to migrate a project to a new laptop Blog](https://medium.com/@marinithiago/using-docker-compose-to-migrate-a-project-to-a-new-laptop-f4aabde1ad6b)
