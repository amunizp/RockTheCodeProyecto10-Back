const { default: mongoose } = require('mongoose')

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Connected to Mongo 🥬')
  } catch (error) {
    console.error(error)
    console.log('Error while trying to connect to Mongo 🤨')
  }
}
module.exports = connectMongo
