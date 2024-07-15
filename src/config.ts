import dotenv from "dotenv";

dotenv.config({
  path: __dirname+ "/../.env"
});

const config = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 30000,
    refereshTokenExpiryMS: 300000000,
  },
  database: {
    client: process.env.DB_CLIENT,
    host:  process.env.DB_HOST,
    port:  process.env.DB_PORT,
    user:  process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    name:  process.env.DB_NAME
  },
  email: process.env.ADMIN_EMAIL
};

export default config;
