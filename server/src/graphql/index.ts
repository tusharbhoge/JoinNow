import { ApolloServer } from '@apollo/server';
import { resolvers, typeDefs } from './user';

async function CreateGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs, 
    resolvers 
  });
  await gqlServer.start();
  console.log("gqlserver started")
  
  return gqlServer;
}

export default CreateGraphqlServer;
