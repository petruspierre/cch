const connection = require('../database/connection')

function getRandom(max) {
  return Math.floor(Math.random() * max + 1)
}

module.exports = 
  async function randomGreen(mao, match){
    const maxIdQuery = await connection('deck').max('id as maxId').first()

    let a = await connection('partidas').where('id', match).select('cartasVerdes')
    const listaCartas = a[0].cartasVerdes

    let ans;
    let cont = 0
    while(cont === 0){
      const cardId = getRandom(maxIdQuery.maxId)
      let d = await connection('deck').where('type', 'green').where('id', cardId)
      const card = d[0]

      if(card !== null && card !== undefined && listaCartas.indexOf(cardId) === -1 && mao.indexOf(cardId) === -1){
        cont++
        ans = card
      }
    }
    console.log(ans.id)
    return ans.id
  }
