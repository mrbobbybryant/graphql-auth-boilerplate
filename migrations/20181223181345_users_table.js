exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.unique('email');
    table.string('password');
    table.timestamps(false, true);
    table.timestamp('deleted_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {};
