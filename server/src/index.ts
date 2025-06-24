import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';

async function init(){
    
const app = express();
const PORT = Number(process.env.PORT) || 8000;

const gqlServer = new ApolloServer({
    typeDefs:`
        type Query{
            hello : String
        }
    `,
    resolvers:{
        Query:{
            hello: ()=>`hey there I am graphQL server`
        }
    }
});

await gqlServer.start();

app.get("/",(req,res)=>{
    res.json({
        msg:"server has started"
    })
});

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(gqlServer),
);

app.listen(PORT,()=>console.log(`Server is running on Port : ${PORT}`));
}

init();