import signup from './mutations/signup';
import login from './mutations/login';
import logout from './mutations/logout';
import forgotPassword from './mutations/forgot-password-request';

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
    forgotPassword,
  },
};

export default { resolvers, typeDefs };
