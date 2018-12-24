import users from './queries/users';

const typeDefs = `
  type User {
    id: Int!
    email: String!
    token: String!
  }
`;

const resolvers = {
  Query: {
    users,
  },
};

export default { resolvers, typeDefs };
