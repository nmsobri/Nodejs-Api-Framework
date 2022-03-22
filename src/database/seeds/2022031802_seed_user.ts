import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('user').del();

    // Inserts seed entries
    const password = '123456';
    const hashedPassword = await bcrypt.hash(password, 10);

    await knex('user').insert([
        { username: 'slier', password: hashedPassword },
    ]);
}
