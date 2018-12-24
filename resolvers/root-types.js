export default `
  type Query {
    #Users
    users: [User]
  }

  type Mutation {
    #Auth
    signup(input: UserSignupInput!): User
    login(input: UserSignupInput!): User
  }

  type Rules {
    name: String!
    value: String!
  }
`;
