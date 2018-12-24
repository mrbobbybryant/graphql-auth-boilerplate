import * as bcrypt from 'bcryptjs';
import Validator from 'validatorjs';
import User from 'models/users';
import jwt from '../shared/jwt';

export const signup = (User, jwt) => async (args, { input }, context) => {
  const rules = {
    password: 'size:8',
    email: 'email',
  };
  const validation = new Validator(input, rules);
  const valid = validation.passes() ? true : validation.errors.all();

  if (true !== valid && valid.password) {
    ApolloError({
      code: 400,
      field: 'password',
      message: valid.password[0],
    });
  }

  if (true !== valid && valid.email) {
    ApolloError({
      code: 400,
      field: 'email',
      message: valid.email[0],
    });
  }

  const password = await bcrypt.hash(input.password, 10);

  try {
    const user = await User.create(input.email, password);

    const token = jwt(user.id);
    return {
      ...user,
      token,
    };
  } catch (error) {
    if ('users_email_unique' === error.constraint) {
      ApolloError({
        code: 400,
        field: 'email',
        message: 'A user with this email already exists.',
      });
    }
  }
};

export default signup(User, jwt);
