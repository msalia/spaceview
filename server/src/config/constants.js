const DB_SERVER = process.env.DB_SERVER || 'localhost';
const DB_NAME = process.env.DB_NAME || 'spaceview';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
const SUBSCRIPTIONS_PATH = '/subscriptions';

export default {
  HOST,
  PORT,
  DB_URL: `mongodb://${DB_SERVER}/${DB_NAME}`,
  DEBUG_MODE: true,
  DEVELOPMENT: process.env.NODE_ENV === 'dev',
  GRAPHIQL_PATH: '/graphiql',
  GRAPHQL_PATH: '/graphql',
  JWT_SECRET: 'm@HaN72@!8',
  SUBSCRIPTION_ENDPOINT: `ws://${HOST}:${PORT}${SUBSCRIPTIONS_PATH}`,
  SUBSCRIPTIONS_PATH,
  Subscriptions: {},
};
