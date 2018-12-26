import signup from './mutations/signup';
import login from './mutations/login';
import logout from './mutations/logout';
import forgotPassword from './mutations/forgot-password-request';
import changePassword from './mutations/forgot-password-change';

const typeDefs = `
  input UserSignupInput {
    password: String!
    email: String!
  }

  input UserChangePasswordInput {
    password: String!
    key: String!
  }
`;

const resolvers = {
  Mutation: {
    signup,
    login,
    logout,
    forgotPassword,
    changePassword,
  },
};

export default { resolvers, typeDefs };
