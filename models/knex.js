import knex from 'knex';
import { Model } from 'objection';

const client = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 0,
    max: process.env.MAX_CON ? parseInt(process.env.MAX_CON, 10) : 1,
  },
});

Model.knex(client);

export default client;
