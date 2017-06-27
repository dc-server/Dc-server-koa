const knex = require('knex')

const dbConfig = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  }
}

const db = knex(dbConfig)

module.exports = db
