import { mapValues } from 'lodash';
import rootTypes from './root-types';
import errorHandler from './error-handler';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeResolvers } from 'merge-graphql-schemas';

// Resolvers
import users from './users';
import auth from './auth';

const resolvers = [users, auth];

export const typeDefs = [
  ...resolvers.map(resolver => resolver.typeDefs),
  rootTypes,
  `scalar Upload`,
];

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    ...mapValues(
      mergeResolvers(resolvers.map(resolver => resolver.resolvers)),
      resolver => mapValues(resolver, item => errorHandler(item)),
    ),
  },
});
