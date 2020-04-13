const connection = require('../database/connection')

module.exports = {
  async index(req, res) {
    const matches = await connection('partidas').select('*')

    return res.json(matches)
  },

  create(req, res) {
    const { 
      jogadores, 
      cartaVermelha, 
      cartasVerdes, 
      historicoVermelhas, 
      cartasSelecionadas,
      rodada, 
      qtdJogadores, 
      jogaram, 
      votoDoJuri 
    } = req.body

    connection('partidas').insert({
      jogadores, 
      cartaVermelha, 
      cartasVerdes, 
      historicoVermelhas, 
      cartasSelecionadas,
      rodada, 
      qtdJogadores, 
      jogaram, 
      votoDoJuri
    })
    .then(_ => res.status(204).send())
    .catch(err => res.status(400).json(err))
  },

  async edit(req, res) {

  },

  async delete(req,res) {
    const { id } = req.params

    await connection('partidas')
      .where('id', id)
      .delete()
    
    return res.status(204).send()
  },

  async proximaRodada(req,res){
    // definir juri
    // sortear vermelha
  },

  async reiniciarPartida(req,res){

  }
}