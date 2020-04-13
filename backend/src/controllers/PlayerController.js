const connection = require('../database/connection')

const generateUniqueId = require('../utils/generateUniqueId')
const setupPlayer = require('../utils/generateHandDeck')
const randomGreen = require('../utils/generateRandomCard')

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
    const cartas = await setupPlayer(match, id)

    connection('jogadores').insert({
      id,
      username, 
      pontos, 
      cartas, 
      jogou, 
      juri
    })
    .then(_ => res.send({ id, cartas }))
    .catch(err => res.status(400).json(err))
  },

  async delete(req, res){
    const { id, match } = req.params

    await connection('jogadores').where('id', id).delete()

    let b = await connection('partidas').where('id', match).select('jogadores')
    let listaPlayers = b[0].jogadores

    let c = await connection('partidas').where('id', match).select('cartasVerdes')
    let listaCartas = c[0].cartasVerdes

    listaCartas.splice(listaPlayers.indexOf(id)*8,8)
    listaPlayers.splice(listaPlayers.indexOf(id), 1)

    connection('partidas').where('id', match).update({
      jogadores: listaPlayers,
      qtdJogadores: listaPlayers.length,
      cartasVerdes: listaCartas
    })
    .then(_ => res.send(204))
    .catch(err => console.log(err))

  },

  async jogar(req, res) {
    const { id, match } = req.params

    const a = await connection('jogadores').where('id', id).select('jogou')
    let status = a[0].jogou

    const b = await connection('partidas').where('id', match).select('jogaram')
    let jogaram = b[0].jogaram
    
    status = true

    connection('jogadores').where('id', id).update({
      jogou: status
    })
    .then(_ => res.send({ status }))
    .catch(err => res.json(err))

    connection('partidas').where('id', match).update({
      jogaram: jogaram + 1
    })
    .catch(err => res.json(err))
    // só mudar o "jogou"
  },

  async selecionouCarta(req,res){
    const { id, carta, match } = req.params

    let a = await connection('partidas').where('id', match).select('cartasSelecionadas')
    let listaCartasSelecionadas = a[0].cartasSelecionadas

    let b = await connection('jogadores').where('id', id).select('cartas')
    let mao = b[0].cartas

    let c = await connection('partidas').where('id', match).select('cartasVerdes')
    let listaCartas = c[0].cartasVerdes

    console.log(listaCartasSelecionadas, mao, listaCartas)

    const novaCarta = randomGreen(mao, match)
    mao[mao.indexOf(carta)] = novaCarta
    listaCartas[listaCartas.indexOf(carta)] = novaCarta

    console.log(listaCartasSelecionadas, mao, listaCartas)

    connection('partidas').where('id', match).update({
      cartasSelecionadas: [...listaCartasSelecionadas, carta],
      listaCartas
    })
    .then(_ => res.send({carta}))
    .catch(err => res.json(err).sendStatus(400))
  },

  async adicionarPonto(req, res) {

  },
  
  async votoDoJuiz(req, res) {

  }
}