import User from 'models/users';

export default async (_, __, { user_id }) => {
  if (!user_id) {
    ApolloError({
      code: 401,
    });
  }

  const user = await User.getUserById(user_id);

  if (!user) {
    ApolloError({
      code: 401,
    });
  }

  return user;
};
