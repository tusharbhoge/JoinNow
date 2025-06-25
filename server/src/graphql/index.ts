import { ApolloServer } from '@apollo/server';
import { resolvers, typeDefs } from './user';

async function CreateGraphqlServer(){

    const gqlServer = new ApolloServer({
    typeDefs:`
        ${typeDefs}
    `,
    resolvers:{
        resolvers
    }
    });

    await gqlServer.start();

    return gqlServer

};

export default CreateGraphqlServer;