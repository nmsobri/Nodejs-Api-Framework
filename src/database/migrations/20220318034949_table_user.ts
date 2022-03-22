import knex, { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user', (table: Knex.CreateTableBuilder) => {
        table.increments();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.text('refresh_token').nullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user');
}
