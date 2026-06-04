require('dotenv').config()

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL', // 👈 Le dice a Sequelize que lea tu .env
    dialect: 'postgres'
  },
  test: {
    database: 'door_drop_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}