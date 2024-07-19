import { Knex } from 'knex';

const TABLE_NAME = 'permissions';

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
          id: 1,
          permission_name: 'user.create',
        },
        {
          id: 2,
          permission_name: 'user.update',
        },
        {
          id: 3,
          permission_name: 'user.delete',
        },
        {
          id: 4,
          permission_name: 'user.get',
        },
        {
          id: 5,
          permission_name: 'todo.create',
        },
        {
          id: 6,
          permission_name: 'todo.update',
        },
        {
          id: 7,
          permission_name: 'todo.delete',
        },
        {
          id: 8,
          permission_name: 'todo.get',
        }
      ]);
    });
}