import { Knex } from 'knex';

const TABLE_NAME = 'users';


/**
 * Create table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();

    table.string("name", 100).notNullable();
    table.string("email", 100).notNullable();
    table.string("password", 100).notNullable();
    table.boolean("isAdmin").notNullable();
    table.integer("role_id").unsigned().notNullable();
    table.foreign("role_id").references("id").inTable("role");

    table.timestamps(true, true);
    
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}