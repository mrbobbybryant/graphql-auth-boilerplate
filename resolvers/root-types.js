export default `
  type Query {
    #Users
    users: [User]
    me: User
  }

  type Mutation {
    #Auth
    signup(input: UserSignupInput!): User
    login(input: UserSignupInput!): User
    logout: Boolean!
    forgotPassword: Boolean!
    changePassword(input: UserChangePasswordInput!): User
  }

  type Rules {
    name: String!
    value: String!
  }
`;
