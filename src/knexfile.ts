import { Knex } from "knex";
import config from "./config";
export const baseKnexConfig: Knex.Config = {
  client: config.database.client,
  connection: {
    connectionString: config.database.connectionUrl
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
