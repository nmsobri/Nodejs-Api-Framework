import type { Knex } from 'knex';

interface KnexConfig {
    [key: string]: Knex.Config;
}

const config: KnexConfig = {
    // Default environment used by Knex when using cli
    development: {
        client: 'mysql2',
        connection: {
            host: 'mysql',
            user: 'root',
            password: 'root',
            database: 'nodejs_api',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'mysql2',
        connection: {
            host: 'mysql',
            user: 'root',
            password: 'root',
            database: 'nodejs_api',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};

export default config;
