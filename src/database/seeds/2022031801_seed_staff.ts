import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('staff').del();

    // Inserts seed entries
    await knex('staff').insert([
        { first_name: 'karim', last_name: 'pin' },
        { first_name: 'abu', last_name: 'daud' },
        { first_name: 'sobri', last_name: 'puteh' },
    ]);
}
