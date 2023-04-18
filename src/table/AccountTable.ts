import { AccountRecord } from '../record/AccountRecord';
import { BaseTable } from './BaseTable';

export class AccountTable extends BaseTable {

  public static readonly instance = new AccountTable();

  private readonly TABLE_NAME = 'accounts';

  private readonly EMAIL_NAME = 'accountEmail';

  private readonly HASH_NAME = 'accountPasswordHash';

  private readonly SALT_NAME = 'accountPasswordSalt';

  public constructor() {
    super();
  }

  public async initialize(): Promise<void> {
    if (!await this.connection.schema.hasTable(this.TABLE_NAME)) {
      await this.connection.schema.createTable(this.TABLE_NAME, (table) => {
        table.text(this.EMAIL_NAME).primary();
        table.text(this.HASH_NAME);
        table.text(this.SALT_NAME);
      });
    }
  }

  public async getAccount(accountEmail: string): Promise<AccountRecord> {
    let result = await this.connection<AccountRecord>(this.TABLE_NAME)
      .select('*')
      .where(this.EMAIL_NAME, accountEmail);
    if (result.length === 0) {
      throw new Error('Account does not exist');
    }
    return result[0];
  }

  public async putAccount(record: AccountRecord) {
    let result = await this.connection<AccountRecord>(this.TABLE_NAME)
      .select('*')
      .where(this.EMAIL_NAME, record.accountEmail);
    if (result.length !== 0) {
      throw new Error('Account email already in use');
    }
    await this.connection<AccountRecord>(this.TABLE_NAME)
      .insert(record);
  }

}
