import { Knex } from "knex";
import config from "./config";
const baseKnexConfig: Knex.Config = {
  client: config.database.client,
  connection: {
    host: config.database.host,
    port: +config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
  },
};

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  migrations: {
    directory: "./database/migrations",
    tableName: "migrations",
    extension: "ts",
    stub: "./stub/migration.stub"
  },
  seeds: {
    directory: "./database/seeds",
    extension: "ts",
    stub: "./stub/seed.stub"
  }
};

export default knexConfig;