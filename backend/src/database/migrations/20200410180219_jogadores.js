
exports.up = function(knex) {
  return knex.schema.createTable('jogadores', table => {
    table.string('id').notNullable()
    table.string('username').notNullable()
    table.integer('pontos').notNullable()
    table.specificType('cartas', 'integer ARRAY').notNullable()
    table.boolean('jogou').notNullable()
    table.boolean('juri').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('jogadores')
};
  