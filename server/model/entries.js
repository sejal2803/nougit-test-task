const mongoose = require('mongoose')

const entriesSchema = new mongoose.Schema({
  author: { name: String, picture: String, title: String, score: Number },
  date: Date,
  popularity: Number,
  isTrending: Boolean,
  title: String,
  description: String,
  numComments: Number,
  thumbnail: String,
  codeSubmissionTotal: Number,
  pledgeTotal: Number,
  pledgeGoal: Number,
  pledgerCount: Number,
  status: Number
})

const Entries = mongoose.model('Entries', entriesSchema)

module.exports = Entries
