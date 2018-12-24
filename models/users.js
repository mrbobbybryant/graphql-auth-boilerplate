import { Model } from 'objection';

export default class User extends Model {
  static get tableName() {
    return 'users';
  }
}

export const create = async (email, password) => {
  return await User.query().insert({ email, password });
};

export const get = async email => {
  return await User.query()
    .where({ email })
    .first();
};

export const getAll = async () => {
  return await User.query();
};

User.create = create;
User.get = get;
User.getAll = getAll;
