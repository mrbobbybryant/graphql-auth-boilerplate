import User from 'models/users';

export default async (parent, args, context) => {
  return await User.getAll();
};
