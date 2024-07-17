import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          name: "BIrendra Bohara",
          email: "birendrabohara2074@gmail.com",
          password:
            "$2a$10$6vNqMASnomy3KOHOPEezuOcEwts8mbY8pif2Zza.COqY6Uu8X9JTm",
        }
      ]);
    });
}
