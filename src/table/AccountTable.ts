import { AccountRecord } from '../record/AccountRecord';
import { BaseTable } from './BaseTable';

export class AccountTable extends BaseTable {

  public static readonly instance = new AccountTable();

  private readonly tableName = 'accounts';

  public constructor() {
    super();
  }

  public async initialize(): Promise<void> {
    if (!await this.connection.schema.hasTable(this.tableName)) {
      await this.connection.schema.createTable(this.tableName, (table) => {
        table.text('accountEmail').primary();
        table.text('accountPasswordHash');
        table.text('accountPasswordSalt');
      });
    }
  }

  public async getAccount(accountEmail: string): Promise<AccountRecord> {
    let result = await this.connection<AccountRecord>(this.tableName)
      .select('*')
      .where('accountEmail', accountEmail);
    if (result.length === 0) {
      throw new Error('Account does not exist');
    }
    return result[0];
  }

  public async putAccount(record: AccountRecord) {
    let result = await this.connection<AccountRecord>(this.tableName)
      .select('*')
      .where('accountEmail', record.accountEmail);
    if (result.length !== 0) {
      throw new Error('Account email already in use');
    }
    await this.connection<AccountRecord>(this.tableName)
      .insert(record);
  }

}
