import express from 'express';
import cors from 'cors';
import { expressMiddleware } from '@as-integrations/express5';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import CreateGraphqlServer from './graphql';

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;
  const httpServer = http.createServer(app); 

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  const gqlServer = await CreateGraphqlServer();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(gqlServer, {
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        return {
          userId: token,
          io, 
        };
      },
    })
  );

  httpServer.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
  );
}

init();
