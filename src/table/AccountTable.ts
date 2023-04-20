import { AccountRecord } from '../record/AccountRecord';
import { BaseTable } from './BaseTable';

export class AccountTable extends BaseTable {

  public static readonly instance = new AccountTable();

  private readonly TABLE_NAME = 'accounts';

  private readonly ACCOUNT_EMAIL          = 'accountEmail';
  private readonly ACCOUNT_PASSWORD_HASH  = 'accountPasswordHash';
  private readonly ACCOUNT_PASSWORD_SALT  = 'accountPasswordSalt';
  private readonly ACCOUNT_ACTIVATED      = 'accountActivated';

  public constructor() {
    super();
  }

  public async initialize(): Promise<void> {
    if (!await this.connection.schema.hasTable(this.TABLE_NAME)) {
      await this.connection.schema.createTable(this.TABLE_NAME, (table) => {
        table.text(this.ACCOUNT_EMAIL).primary();
        table.text(this.ACCOUNT_PASSWORD_HASH);
        table.text(this.ACCOUNT_PASSWORD_SALT);
        table.integer(this.ACCOUNT_ACTIVATED);
      });
    }
  }

  public async getAccount(accountEmail: string): Promise<AccountRecord> {
    let result = await this.connection<AccountRecord>(this.TABLE_NAME)
      .select('*')
      .where(this.ACCOUNT_EMAIL, accountEmail);
    if (result.length === 0) {
      throw new Error('Account does not exist');
    }
    return result[0];
  }

  public async putAccount(record: AccountRecord) {
    let result = await this.connection<AccountRecord>(this.TABLE_NAME)
      .select('*')
      .where(this.ACCOUNT_EMAIL, record.accountEmail);
    if (result.length !== 0) {
      throw new Error('Account email already in use');
    }
    await this.connection<AccountRecord>(this.TABLE_NAME)
      .insert(record);
  }

}
