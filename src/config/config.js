module.exports = {
  development: {
    username: 'postgres',
    password: 'nicole',
    database: 'preAcademic',
    host: 'localhost',
    dialect: 'postgres',
    force: false,
    email: {
      username: 'noreplyacademicinfo@gmail.com',
      password: 'preAcademicinfo2k19'
    }
  },
  test: {
    dialect: "postgres",
    storage: ":memory:",
    force: false,
    email: {
      username: '',
      password: ''
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    force: false,
    email: {
      username: '',
      password: ''
    }
  }
};