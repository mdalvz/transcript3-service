import { SessionRecord } from '../record/SessionRecord';
import { BaseTable } from './BaseTable';

export class SessionTable extends BaseTable {

  public static readonly instance = new SessionTable();

  private readonly TABLE_NAME = 'sessions';

  private readonly ID_NAME = 'sessionToken';

  private readonly EMAIL_NAME = 'accountEmail';

  private readonly EXPIRATION_NAME = 'expirationDate';

  public constructor() {
    super();
  }

  public async initialize(): Promise<void> {
    if (!await this.connection.schema.hasTable(this.TABLE_NAME)) {
      await this.connection.schema.createTable(this.TABLE_NAME, (table) => {
        table.text(this.ID_NAME).primary();
        table.text(this.EMAIL_NAME);
        table.bigInteger(this.EXPIRATION_NAME);
      });
    }
  }

  public async getSession(sessionToken: string): Promise<SessionRecord> {
    let result = await this.connection<SessionRecord>(this.TABLE_NAME)
      .select('*')
      .where(this.ID_NAME, sessionToken)
      .andWhere(this.EXPIRATION_NAME, '>', new Date().getTime());
    if (result.length === 0) {
      throw new Error('Session does not exist');
    }
    return result[0];
  }

  public async putSession(record: SessionRecord) {
    await this.connection<SessionRecord>(this.TABLE_NAME)
      .insert(record);
  }

  public async updateSession(record: SessionRecord) {
    await this.connection<SessionRecord>(this.TABLE_NAME)
      .update(record)
      .where(this.ID_NAME, record.sessionToken);
  }

}
