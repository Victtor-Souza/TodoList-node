
exports.up = function(knex) {
  return knex.schema.createTable('tasks', function(table) {
      table.increments('id').primary();
      table.string('description', 200);
      table.datetime('final_date');
      table.boolean('finished');

  })
};

exports.down = function(knex) {
return knex.schema.dropTable('tasks')
};
