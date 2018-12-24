import * as bcrypt from 'bcryptjs';
import User from 'models/users';
import jwt from '../shared/jwt';

export const login = (User, bcrypt, jwt) => async (_, { input }, { req }) => {
  const { email, password } = input;
  const user = await User.get(email);

  if (!user) {
    ApolloError({
      code: 400,
      field: 'email',
      message: 'Invalid Email.',
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    ApolloError({
      code: 400,
      field: 'password',
      message: 'Invalid Password.',
    });
  }

  req.session.userId = jwt(user.id);
  return user;
};

export default login(User, bcrypt, jwt);
