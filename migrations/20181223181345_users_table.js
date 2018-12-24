exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table
      .string('email')
      .unique()
      .notNullable();
    table.string('password').notNullable();
    table.string('first_name');
    table.string('last_name');
    table.enu('tole', ['admin', 'author', 'customer']);
    table.timestamps(false, true);
    table.timestamp('deleted_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {};
