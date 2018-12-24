import users from './queries/users';
import me from './queries/me';

const typeDefs = `
  type User {
    id: Int!
    email: String!
    token: String
  }
`;

const resolvers = {
  Query: {
    users,
    me,
  },
};

export default { resolvers, typeDefs };
