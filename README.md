
## Back end authentication flow
* based on JWT tokens

## Technologies
Project is created with:
* Typescript
* DynamoDB
* Express
It is recommended to use Helmet package for safety reasons 

## Setup
To run this project,
create .env file, example:
```
$ PORT=3001
$ NODE_ENV=development

$ ACCESS_KEY=your_key
$ SECRET_KEY=your_secret_key
$ AWS_REGION=eu-central-1
$ ENDPOINT=https://dynamodb.eu-central-1.amazonaws.com
$ JWT_SECRET=create_hex_64_bit

install it locally using npm:

```
$ npm install
$ npm run build
$ npm start

For debugging and updating:

```
$ npm run debug
