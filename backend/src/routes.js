const express = require('express')

//importar os controllers aqui
const DeckController = require('./controllers/DeckController')

const routes = express.Router()

// chamar os controles como middlewares
routes.get('/deck', DeckController.index)

routes.post('/deck', DeckController.create)

routes.delete('/deck/:id', DeckController.delete)

module.exports = routes