import cors from 'cors';
import express from 'express';
import jwt from 'express-jwt';
import schema from './resolvers';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { Model } from 'objection';
import client from './models/knex';

Model.knex(client);

const app = express();

app.use(cors());
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
    userProperty: 'user',
  }),
);

app.use(async (req, res, next) => {
  if (!req.user) return next();
  // Load the user just in case we need the full user, remove later if not
  //   try {
  //     req.user = await globalContext
  //       .client('wp_users')
  //       .where('ID', req.user.data.userId)
  //       .first();
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   // Fuck wordpress
  //   req.user.id = req.user.ID;
  req.token = req.headers.authorization;

  next();
});

app.use(
  '/',
  bodyParser.json(),
  graphqlExpress(async ({ token }) => ({
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
    context: { token },
  })),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const { PORT = 8081 } = process.env;

app.listen(PORT);
