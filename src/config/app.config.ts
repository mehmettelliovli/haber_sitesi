export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.DATABASE_URI,
    port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
  },
  jwt: {
    secret: process.env.SECRET,
    expiresIn: process.env.EXPIRES_IN || '60m',
  },
});
