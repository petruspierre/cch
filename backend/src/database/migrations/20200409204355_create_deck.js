exports.up = function(knex) {
  return knex.schema.createTable('deck', table => {
    table.increments()
    table.string('type').notNullable()
    table.string('description').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('deck')
};
