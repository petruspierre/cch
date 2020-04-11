
exports.up = function(knex) {
  return knex.schema.createTable('partidas', table => {
    table.increments().primary()
    table.specificType('jogadores', 'text ARRAY')
    table.integer('cartaVermelha').notNullable()
    table.specificType('cartasVerdes', 'INT[]')
    table.specificType('historicoVermelhas', 'INT[]')
    table.integer('rodada').notNullable()
    table.integer('qtdJogadores').notNullable()
    table.integer('jogaram').notNullable()
    table.integer('votoDoJuri').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('partidas')
};
  