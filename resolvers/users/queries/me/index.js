import User from 'models/users';

export default async (_, __, { user_id }) => {
  if (!user_id) {
    ApolloError({
      code: 401,
    });
  }

  const user = await User.query()
    .where({ id: user_id })
    .first();

  if (!user) {
    ApolloError({
      code: 401,
    });
  }

  return user;
};
