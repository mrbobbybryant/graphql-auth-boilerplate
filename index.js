import cors from 'cors';
import express from 'express';
import * as jwt from 'jsonwebtoken';
import redis from 'redis';
import redisStore from 'connect-redis';
import schema from './resolvers';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { Model } from 'objection';
import session from 'express-session';
import client from './models/knex';

Model.knex(client);
const store = redisStore(session);
const redisClient = redis.createClient();

const app = express();

app.use(cors());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    store: new store({
      host: 'localhost',
      port: 6379,
      client: redisClient,
      ttl: 260,
    }),
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(async (req, res, next) => {
  if (!req.session || !req.session.userId) return next();

  const { userId } = jwt.verify(req.session.userId, process.env.JWT_SECRET);

  req.user_id = userId;

  next();
});

app.use(
  '/',
  bodyParser.json(),
  graphqlExpress(async req => ({
    schema,
    tracing: true,
    cacheControl: process.env.ENABLE_CACHING ? true : false,
    formatError: e => {
      if (process.env.LOG_GQL_ERRORS) console.error(e);
      try {
        return JSON.parse(e.message.replace('Error: ', ''));
      } catch (newError) {
        return e;
      }
    },
    context: { req, user_id: req.user_id },
  })),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const { PORT = 8081 } = process.env;

app.listen(PORT);
