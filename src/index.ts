import { ApolloServer } from '@apollo/server';
import { startStandaloneServer} from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import path from 'path';
import { gql } from 'graphql-tag';

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
  const server = new ApolloServer({ typeDefs });
  const { url } = await startStandaloneServer(server);
  console.log(`
    Server is running! 
    Query at ${url}`
  );
}

startApolloServer();