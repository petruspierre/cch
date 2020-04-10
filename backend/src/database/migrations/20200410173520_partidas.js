
exports.up = function(knex) {
  return knex.schema.createTable('partidas', table => {
    table.specificType('jogadores', 'text ARRAY')
    table.integer('carta-vermelha').notNullable()
    table.specificType('cartas-verdes', 'integer ARRAY')
    table.specificType('historico-vermelhas', 'integer ARRAY')
    table.integer('rodada').notNullable()
    table.integer('qtd-jogadores').notNullable()
    table.integer('jogaram').notNullable()
    table.integer('voto-do-juri').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('partidas')
};
  