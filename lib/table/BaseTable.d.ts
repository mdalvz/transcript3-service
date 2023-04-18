import { Knex } from 'knex';
export declare abstract class BaseTable {
    protected readonly connection: Knex;
    constructor();
    abstract initialize(): Promise<void>;
}
