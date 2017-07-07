// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'migrations',
    }
  },

  staging: {
    client: 'mysql',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'migrations',
    }
  },

  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'migrations',
    }
  },

  test: {
    client: 'mysql',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'migrations',
    }
  },

}
