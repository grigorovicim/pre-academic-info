module.exports = {
  development: {
    username: 'postgres',
    password: 'root',
    database: 'preAcademic',
    host: 'localhost',
    dialect: 'postgres',
  },
  test: {
    dialect: "postgres",
    storage: ":memory:"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL'
  }
};