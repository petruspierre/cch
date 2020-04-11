const connection = require('../database/connection')

function getRandom(max) {
  return Math.floor(Math.random() * max + 1)
}

module.exports = async function setupPlayer(match, playerId){
  const maxIdQuery = await connection('deck').max('id as maxId').first()

  let a = await connection('partidas').where('id', match).select('cartasVerdes')
  const listaCartas = a[0].cartasVerdes

  let b = await connection('partidas').where('id', match).select('jogadores')
  const listaPlayers = b[0].jogadores

  let cont = 0
  let hand = []
  while(cont < 8){
    const cardId = getRandom(maxIdQuery.maxId)
    const card = await connection('deck').where('type', 'green').where('id', cardId)
    //console.log(usedCards.cartasVerdes)

    if(card !== null && listaCartas.indexOf(cardId) === -1 && hand.indexOf(cardId) === -1){
      hand.push(cardId)
      cont++;
    }

  }
  connection('partidas').where('id', match).update({
    jogadores: [...listaPlayers, playerId],
    cartasVerdes: [...listaCartas,...hand]
  }).catch(err => console.log(err))
  

  return hand
}