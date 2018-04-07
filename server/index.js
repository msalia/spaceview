import './src/config/db';

import Constants from './src/config/constants';
import {SubscriptionServer} from 'subscriptions-transport-ws';

import {createServer} from 'http';
import {execute, subscribe} from 'graphql';
import express from 'express';
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import middlewares from './src/config/middlewares';
import mocks from './src/mocks';
import resolvers from './src/graphql/resolvers';
import typeDefs from './src/graphql/schema';

const app = middlewares(express());
const schema = makeExecutableSchema({typeDefs, resolvers});

// GraphiQL Endpoint
app.use(
  Constants.GRAPHIQL_PATH,
  graphiqlExpress({
    endpointURL: Constants.GRAPHQL_PATH,
    subscriptionsEndpoint: Constants.SUBSCRIPTIONS_ENDPOINT,
  }),
);

// GraphQL Endpoint
app.use(Constants.GRAPHQL_PATH, graphqlExpress(() => ({schema})));

const graphQLServer = createServer(app);

const startServer = () => {
  graphQLServer.listen(Constants.PORT, error => {
    if (error) {
      console.error(error);
    } else {
      new SubscriptionServer(
        {schema, execute, subscribe},
        {
          server: graphQLServer,
          path: Constants.SUBSCRIPTIONS_PATH,
        },
      );

      console.log('#####################################');
      console.log(`Server listening on port: ${Constants.PORT}`);
      console.log('#####################################');
    }
  });
};

// Start Express Server
Constants.DEVELOPMENT ? mocks().then(startServer) : startServer();
