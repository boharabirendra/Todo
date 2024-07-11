import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 30000,
    refereshTokenExpiryMS: 300000,
  },
  email: process.env.ADMIN_EMAIL
};

export default config;
