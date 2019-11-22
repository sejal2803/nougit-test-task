const Entries = require('./model/entries')

const getDefaultEnteries = async args =>
  await Entries.find()
    .limit(args.first)
    .skip(args.offset)
    .sort({
      date: 'desc'
    })

const getTrendingEnteries = async args =>
  await Entries.find()
    .where('isTrending')
    .equals(true)
    .limit(args.first)
    .skip(args.offset)
    .sort({
      popularity: 'desc'
    })

const getOpenTaskEntries = async args =>
  await Entries.find()
    .where('status')
    .equals(1)
    .limit(args.first)
    .skip(args.offset)
    .sort({
      date: 'desc'
    })

const getCompletedTaskEntries = async args =>
  await Entries.find()
    .where('status')
    .equals(0)
    .limit(args.first)
    .skip(args.offset)
    .sort({
      date: 'desc'
    })

// The root provides a resolver function for each API endpoint
const resolver = {
  getEntries: async args => {
    switch (args.query) {
      case 'Trending':
        return await getTrendingEnteries(args)
      case 'Open Tasks':
        return await getOpenTaskEntries(args)
      case 'Completed Tasks':
        return await getCompletedTaskEntries(args)
      default:
        return await getDefaultEnteries(args)
    }
  }
}

module.exports = resolver
