import { knex, Knex } from 'knex';

export abstract class BaseTable {

  protected readonly connection: Knex;

  public constructor() {
    this.connection = knex({
      client: 'better-sqlite3',
      connection: {
        filename: './data.db',
      },
      useNullAsDefault: true,
    });
  }

  public abstract initialize(): Promise<void>;

}
