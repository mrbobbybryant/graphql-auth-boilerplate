import * as bcrypt from 'bcryptjs';
import User from 'models/users';
import jwt from '../shared/jwt';

export default async (args, { input }, context) => {
  const salt = bcrypt.hashSync(process.env.SALT);
  const password = await bcrypt.hash(input.password, salt);
  const user = await User.create(input.email, password);

  const token = jwt(user.id);
  return {
    ...user,
    token,
  };
};
