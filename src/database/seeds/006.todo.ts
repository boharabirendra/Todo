import { Knex } from 'knex';

const TABLE_NAME = 'todos';

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
          title: "new title 1",
          description: "this is new description 1",
          user_id: 2
        },
        {
          title: "new title 2",
          description: "this is new description 1",
          user_id: 2
        },
        {
          title: "new title 3",
          description: "this is new description 1",
          user_id: 3
        },
        {
          title: "new title 3",
          description: "this is new description 1",
          user_id: 3
        },
        {
          title: "new title 3",
          description: "this is new description 1",
          user_id: 3
        },
      ]);
    });
}