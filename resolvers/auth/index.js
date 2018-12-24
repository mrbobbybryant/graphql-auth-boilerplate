import signup from './mutations/signup';
import login from './mutations/login';
import logout from './mutations/logout';

const typeDefs = `
  input UserSignupInput {
    password: String!
    email: String!
  }
`;

const resolvers = {
  Mutation: {
    signup,
    login,
    logout,
  },
};

export default { resolvers, typeDefs };
