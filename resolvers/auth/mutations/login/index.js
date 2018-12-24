import * as bcrypt from 'bcryptjs';
import User from 'models/users';
import jwt from '../shared/jwt';

export default async (args, { input }, context) => {
  const { email, password } = input;
  const user = await User.get(email);

  if (!user) {
    ApolloError({
      code: 400,
      field: 'email',
      message: 'Invalid Email',
    });
  }

  const match = bcrypt.compareSync(password, user.password);

  if (!match) {
    ApolloError({
      code: 400,
      field: 'password',
      message: 'Invalid Password',
    });
  }

  const token = jwt(user.id);
  return {
    ...user,
    token,
  };
};
