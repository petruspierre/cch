const connection = require('../database/connection')

module.exports = {
  async index(req, res) {
    const cards = await connection('deck').select('*')

    const [count] = await connection('deck').count()
    res.header('X-Total-Count', count['count(*)'])

    return res.json(cards)
  },

  create(req,res) {
    const { description, type } = req.body

    connection('deck').insert({
      type,
      description
    })
    .then(_ => res.status(204).send())
    .catch(err => res.status(400).json(err))
  },

  async delete(req,res) {
    const { id } = req.params

    await connection('deck')
      .where('id', id)
      .delete()
    
    return res.status(204).send()
  },
}