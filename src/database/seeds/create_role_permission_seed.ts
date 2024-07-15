import { Knex } from 'knex';

const TABLE_NAME = 'role_permission';

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
          role_id: 1,
          permission_id: 10
        },
        {
          role_id: 1,
          permission_id: 11
        },
        {
          role_id: 1,
          permission_id: 12
        },
        {
          role_id: 1,
          permission_id: 13
        },
        {
          role_id: 1,
          permission_id: 17
        },
        {
          role_id: 1,
          permission_id: 18
        },
        {
          role_id: 2,
          permission_id: 14
        },
        {
          role_id: 2,
          permission_id: 15
        },
        {
          role_id: 2,
          permission_id: 16
        },
        {
          role_id: 2,
          permission_id: 17
        },
       
      ]);
    });
}