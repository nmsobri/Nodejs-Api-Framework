import knex, { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(
        'staff',
        (table: Knex.CreateTableBuilder) => {
            table.increments();
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.timestamps(true, true);
        }
    );
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('staff');
}
