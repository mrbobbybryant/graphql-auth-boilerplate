import signup from './mutations/signup';
import login from './mutations/login';

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
  },
};

export default { resolvers, typeDefs };
