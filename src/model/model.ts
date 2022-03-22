import knex, { Knex } from 'knex';
import config from '../database/knexfile';

const environment = process.env.NODE_ENV ?? 'development';
const dbConfig = config[environment];

declare module 'knex' {
    interface Knex<TRecord, TResult> {
        query<Result = any>(
            sql: string,
            ...params: Knex.Value[]
        ): Promise<Result[]>;
    }
}

class Model {
    db: Knex<any, unknown[]>;

    constructor() {
        this.db = knex(dbConfig);

        // augment knex
        // cannot use `prototype` since this.db is type of knex interface
        // https://stackoverflow.com/questions/68934558/how-to-augment-interfaces-with-functions-in-typescript
        this.db.query = async <Result = any>(
            sql: string,
            ...params: Knex.Value[]
        ): Promise<Result[]> => {
            const result = await this.db.raw<any[]>(sql, params);
            return result[0];
        };
    }
}

export default Model;
