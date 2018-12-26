import * as bcrypt from 'bcryptjs';
import User from 'models/users';
import jwt from '../shared/jwt';

export default async (_, { input }, { redis, req }) => {
  const { key, password } = input;
  const redisKey = `forgotPassword:${key}`;

  const userId = await redis.get(redisKey);

  if (!userId) {
    ApolloError({
      code: 400,
      message: 'Reset password key has expired.',
    });
  }

  if (8 > password.length) {
    ApolloError({
      code: 400,
      message: 'The password must be 8 characters.',
    });
  }

  const hashedPassword = await bcrypt.hash(input.password, process.env.SALT);

  try {
    await User.update(userId, { password: hashedPassword });
    await redis.del(redisKey);

    req.session.userId = jwt(userId);

    return User.getUserById(userId);
  } catch (error) {
    ApolloError({
      code: 400,
      message: 'Error resetting password.',
    });
  }
};
