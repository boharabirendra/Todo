import { Knex } from 'knex';

const TABLE_NAME = 'role_permission';


/**
 * Create table role_permission.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments('id').primary();
    table.integer('role_id').unsigned().notNullable();
    table.integer('permission_id').unsigned().notNullable();

    table.foreign('role_id').references('id').inTable('role'); 
    table.foreign('permission_id').references('id').inTable('permission'); 

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