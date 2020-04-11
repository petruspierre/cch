const connection = require('../database/connection')

const generateUniqueId = require('../utils/generateUniqueId')
const setupPlayer = require('../utils/generateHandDeck')

module.exports = {
  async index (req,res) {
    const { id } = req.params

    const player = await connection('jogadores').where('id', id)

    return res.json(player)
  },

  async create(req, res) {
    const { 
      username,
      pontos,
      jogou,
      juri
    } = req.body

    const { match } = req.params

    const id = generateUniqueId()
    const cards = await setupPlayer(match, id)

    console.log(cards)
    res.send({ id, cards })
  }
}