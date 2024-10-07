export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    API_PORT: parseInt(process.env.API_PORT, 10) || 4000,
  },
})
