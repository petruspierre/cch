const express = require('express')

const DeckController = require('./controllers/DeckController')
const MatchController = require('./controllers/MatchController')
const PlayerController = require('./controllers/PlayerController')

const routes = express.Router()

routes.get('/deck', DeckController.index)
routes.post('/deck', DeckController.create)
routes.delete('/deck/:id', DeckController.delete)

routes.get('/match', MatchController.index)
routes.post('/match', MatchController.create)
routes.delete('/match/:id', MatchController.delete)

routes.get('/player/:id', PlayerController.index)
routes.post('/player/:match', PlayerController.create)
routes.delete('/player/:id/:match', PlayerController.delete)

routes.put('/jogar/:id/:match', PlayerController.jogar)
routes.post('/jogar/:id/:carta/:match', PlayerController.selecionouCarta)

module.exports = routes