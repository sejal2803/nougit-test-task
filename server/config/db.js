const mongoose = require('mongoose')

const mongodbUri = 'mongodb://localhost:27017/social-entries'

const db = mongoose
  .connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database connected...'))
  .catch(error => console.log('Database Error................', error))

module.exports = db
