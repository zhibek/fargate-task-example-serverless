# Fargate - Task Example (using Serverless)

## Prerequisites

### Create AWS account & generate AWS access key
https://portal.aws.amazon.com/billing/signup

### Set AWS access key environment variables
```
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
```

### Install codebase dependencies
```
yarn install
```


## Fargate (ECS) Task

### Setup
Setup the Fargate Task and run it.
```
yarn run setup
```

### Cleanup
Cleanup the Fargate Task when it is no longer required.
```
yarn run cleanup
```
