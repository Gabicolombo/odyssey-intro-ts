import { ApolloServer } from '@apollo/server';
import { startStandaloneServer} from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import path from 'path';
import { gql } from 'graphql-tag';
import { resolvers } from './resolvers';
import { ListingAPI } from './datasources/listing-api';

/**
 * In this line, we need to read the contents of the schema.graphql file.
 * The gql will convert graphql strings into the format that apollo libraries expect.
 */
const typeDefs = gql(
  readFileSync(path.resolve(__dirname, './schema.graphql'), {
    encoding: 'utf-8'
  })
);

async function startApolloServer() {
  // creating an instance of the apollo server class
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          listingAPI: new ListingAPI({ cache }),
        },
      };
    },
  });
  console.log(`
    Server is running! 
    Query at ${url}`
  );
}

startApolloServer();