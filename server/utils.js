const entriesData = require('./dump/entries.json')
const Entries = require('./model/entries')

const Utils = {
  populateDB: async () => {
    const entriesCount = await Entries.countDocuments()
    if (entriesCount === 0) {
      await Entries.insertMany(entriesData)
    }
  }
}

module.exports = Utils
