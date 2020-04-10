const connection = require('../database/connection')

module.exports = {
  async index(req, res) {
    const cards = await connection('deck').select('*')

    const [count] = await connection('deck').count()
    res.header('X-Total-Count', count['count(*)'])

    return res.json(cards)
  },

  async create(req,res) {
    const { description, type } = req.body

    const [id] = await connection('deck').insert({
      type,
      description
    })

    return res.json({ id })
  },

  async delete(req,res) {
    const { id } = req.params

    await connection('deck')
      .where('id', id)
      .delete()
    
    return res.status(204).send()
  },
}