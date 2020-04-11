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
routes.delete('/match/:id', MatchController.create)

routes.get('/player/:id', PlayerController.index)
routes.post('/player/:match', PlayerController.create)

module.exports = routes