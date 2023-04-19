import { ClassRecord } from '../record/ClassRecord';
import { BaseTable } from './BaseTable';

export class ClassTable extends BaseTable {

  public static readonly instance = new ClassTable();

  private readonly TABLE_NAME = 'classes';

  private readonly CLASS_ID       = 'classId';
  private readonly TRANSCRIPT_ID  = 'transcriptId';
  private readonly SUBJECT        = 'subject';
  private readonly NAME           = 'name';
  private readonly LEVEL          = 'level';
  private readonly YEAR           = 'year';
  private readonly PROVIDER       = 'provider';
  private readonly TYPE           = 'type';
  private readonly GRADE          = 'grade';
  private readonly AWARDED        = 'awarded';
  private readonly ATTEMPTED      = 'attempted';

  public constructor() {
    super();
  }

  public async initialize(): Promise<void> {
    if (!await this.connection.schema.hasTable(this.TABLE_NAME)) {
      await this.connection.schema.createTable(this.TABLE_NAME, (table) => {
        table.text(this.CLASS_ID).primary();
        table.text(this.TRANSCRIPT_ID);
        table.text(this.SUBJECT);
        table.text(this.NAME);
        table.bigInteger(this.LEVEL);
        table.text(this.YEAR);
        table.text(this.PROVIDER);
        table.text(this.TYPE);
        table.text(this.GRADE);
        table.bigInteger(this.AWARDED);
        table.bigInteger(this.ATTEMPTED);
        table.index([this.TRANSCRIPT_ID]);
      });
    }
  }

  public async listClasses(transcriptId: string): Promise<ClassRecord[]> {
    let result = await this.connection<ClassRecord>(this.TABLE_NAME)
      .select('*')
      .where(this.TRANSCRIPT_ID, transcriptId);
    return result;
  }

  public async putClass(record: ClassRecord) {
    await this.connection<ClassRecord>(this.TABLE_NAME)
      .insert(record);
  }

  public async updateClass(record: ClassRecord) {
    await this.connection<ClassRecord>(this.TABLE_NAME)
      .update(record)
      .where(this.CLASS_ID, record.classId);
  }

  public async deleteClass(classId: string) {
    await this.connection<ClassRecord>(this.TABLE_NAME)
      .delete()
      .where(this.CLASS_ID, classId);
  }

}
