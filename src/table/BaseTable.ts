import { knex, Knex } from 'knex';

export class BaseTable {

  protected readonly connection: Knex;

  public constructor() {
    this.connection = knex({
      client: 'better-sqlite3',
      connection: {
        filename: './data.db',
      },
    });
  }

}
