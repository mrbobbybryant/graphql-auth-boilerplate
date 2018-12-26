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

export const getUserById = async id =>
  User.query()
    .where({ id })
    .first();

export const getAll = async () => {
  return await User.query();
};

export const update = async (id, data) => {
  console.log(id);
  return await User.query()
    .where({ id })
    .update(data);
};

User.create = create;
User.get = get;
User.getAll = getAll;
User.update = update;
User.getUserById = getUserById;
