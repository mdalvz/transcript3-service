import { ClassRecord } from '../record/ClassRecord';
import { BaseTable } from './BaseTable';

export class ClassTable extends BaseTable {

  public static readonly instance = new ClassTable();

  private readonly TABLE_NAME = 'classes';

  private readonly ID_NAME = 'classId';

  private readonly TRANSCRIPT_ID_NAME = 'transcriptId';

  private readonly SUBJECT_NAME = 'subject';

  private readonly NAME_NAME = 'name';

  private readonly LEVEL_NAME = 'level';

  private readonly YEAR_NAME = 'year';

  private readonly PROVIDER_NAME = 'provider';

  private readonly TYPE_NAME = 'type';

  private readonly GRADE_NAME = 'grade';

  private readonly AWARDED_NAME = 'awarded';

  private readonly ATTEMPTED_NAME = 'attempted';

  public constructor() {
    super();
  }

  public async initialize(): Promise<void> {
    if (!await this.connection.schema.hasTable(this.TABLE_NAME)) {
      await this.connection.schema.createTable(this.TABLE_NAME, (table) => {
        table.text(this.ID_NAME).primary();
        table.text(this.TRANSCRIPT_ID_NAME);
        table.text(this.SUBJECT_NAME);
        table.text(this.NAME_NAME);
        table.bigInteger(this.LEVEL_NAME);
        table.text(this.YEAR_NAME);
        table.text(this.PROVIDER_NAME);
        table.text(this.TYPE_NAME);
        table.text(this.GRADE_NAME);
        table.bigInteger(this.AWARDED_NAME);
        table.bigInteger(this.ATTEMPTED_NAME);
        table.index([this.TRANSCRIPT_ID_NAME]);
      });
    }
  }

  public async listClasses(transcriptId: string): Promise<ClassRecord[]> {
    let result = await this.connection<ClassRecord>(this.TABLE_NAME)
      .select('*')
      .where(this.TRANSCRIPT_ID_NAME, transcriptId);
    return result;
  }

  public async putClass(record: ClassRecord) {
    await this.connection<ClassRecord>(this.TABLE_NAME)
      .insert(record);
  }

  public async updateClass(record: ClassRecord) {
    await this.connection<ClassRecord>(this.TABLE_NAME)
      .update(record)
      .where(this.ID_NAME, record.classId);
  }

  public async deleteClass(classId: string) {
    await this.connection<ClassRecord>(this.TABLE_NAME)
      .delete()
      .where(this.ID_NAME, classId);
  }

}
