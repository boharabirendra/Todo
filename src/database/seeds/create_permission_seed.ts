import { Knex } from 'knex';

const TABLE_NAME = 'permission';

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
          permission_name: "user.create"
        },
        {
          permission_name: "user.update"
        },
        {
          permission_name: "user.delete"
        },
        {
          permission_name: "user.get"
        },
        {
          permission_name: "todo.create"
        },
        {
          permission_name: "todo.update"
        },
        {
          permission_name: "todo.delete"
        },
        {
          permission_name: "todo.get"
        },
        {
          permission_name: "todo.getAll"
        },
       
      ]);
    });
}