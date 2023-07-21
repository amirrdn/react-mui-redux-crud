// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('contact', (table) => {
    table.increments('id')
    table.string('fullname', 50).notNullable();
    table.string('city', 50).notNullable();
    table.enu('gender', [1, 2]).nullable();
    table.string('address', 50).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('text')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('contact')
}
