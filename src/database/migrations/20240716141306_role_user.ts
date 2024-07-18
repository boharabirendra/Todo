import { Knex } from 'knex';

const TABLE_NAME = 'role_user';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.integer("user_id").notNullable();
    table.integer("role_id").notNullable();
    table.foreign("role_id").references("id").inTable("roles").onDelete("cascade");
    table.foreign("user_id").references("id").inTable("users").onDelete("cascade");
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
