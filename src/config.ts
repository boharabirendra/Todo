import dotenv from "dotenv";

dotenv.config({
  path: __dirname+ "/../.env"
});

const config = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: '15d',
    refereshTokenExpiryMS: '25d',
  },
  database: {
    client: process.env.DB_CLIENT,
    connectionUrl: process.env.DB_CONNECTION,
  },
};

export default config;
