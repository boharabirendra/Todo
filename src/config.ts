import dotenv from "dotenv";

dotenv.config();

const config = {
    port: process.env.PORT,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_port: process.env.DB_PORT,
}

export default config;