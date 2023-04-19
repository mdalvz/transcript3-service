import { TranscriptRecord } from '../record/TranscriptRecord';
import { BaseTable } from './BaseTable';

export class TranscriptTable extends BaseTable {

  public static readonly instance = new TranscriptTable();

  private readonly TABLE_NAME = 'transcripts';

  private readonly ID_NAME                  = 'transcriptId';
  private readonly ACCOUNT_EMAIL_NAME       = 'accountEmail';
  private readonly SCHOOL_NAME              = 'schoolName';
  private readonly SCHOOL_ADDRESS_NAME      = 'schoolAddress';
  private readonly ADMIN_TITLE_NAME         = 'adminTitle';
  private readonly ADMIN_NAME               = 'adminName';
  private readonly ADMIN_PHONE_NAME         = 'adminPhone';
  private readonly ADMIN_EMAIL_NAME         = 'adminEmail';
  private readonly STUDENT_FIRST_NAME       = 'studentNameFirst';
  private readonly STUDENT_MIDDLE_NAME      = 'studentNameMiddle';
  private readonly STUDENT_LAST_NAME        = 'studentNameLast';
  private readonly STUDENT_SUFFIX_NAME      = 'studentNameSuffix';
  private readonly STUDENT_BIRTH_DATE_NAME  = 'studentBirthDate';
  private readonly STUDENT_ADDRESS_NAME     = 'studentAddress';
  private readonly STUDENT_PHONE_NAME       = 'studentPhone';
  private readonly STUDENT_EMAIL_NAME       = 'studentEmail';
  private readonly TRANSCRIPT_TITLE_NAME    = 'transcriptTitle';
  private readonly TRANSCRIPT_LOGO_NAME     = 'transcriptLogo';
  private readonly ARRANGE_BY_GRADE_NAME    = 'arrangeByGrade';
  private readonly WEIGHTED_GPA_NAME        = 'computeWeightedGPA';

  public constructor() {
    super();
  }

  public async initialize(): Promise<void> {
    if (!await this.connection.schema.hasTable(this.TABLE_NAME)) {
      await this.connection.schema.createTable(this.TABLE_NAME, (table) => {
        table.text(this.ID_NAME).primary();
        table.text(this.ACCOUNT_EMAIL_NAME);
        table.text(this.SCHOOL_NAME);
        table.text(this.SCHOOL_ADDRESS_NAME);
        table.text(this.ADMIN_TITLE_NAME);
        table.text(this.ADMIN_NAME);
        table.text(this.ADMIN_PHONE_NAME);
        table.text(this.ADMIN_EMAIL_NAME);
        table.text(this.STUDENT_FIRST_NAME);
        table.text(this.STUDENT_LAST_NAME);
        table.text(this.STUDENT_MIDDLE_NAME);
        table.text(this.STUDENT_SUFFIX_NAME);
        table.text(this.STUDENT_BIRTH_DATE_NAME);
        table.text(this.STUDENT_ADDRESS_NAME);
        table.text(this.STUDENT_PHONE_NAME);
        table.text(this.STUDENT_EMAIL_NAME);
        table.text(this.TRANSCRIPT_TITLE_NAME);
        table.text(this.TRANSCRIPT_LOGO_NAME);
        table.boolean(this.ARRANGE_BY_GRADE_NAME);
        table.boolean(this.WEIGHTED_GPA_NAME);
        table.index([this.ACCOUNT_EMAIL_NAME]);
      });
    }
  }

  public async listTranscripts(accountEmail: string): Promise<TranscriptRecord[]> {
    let result = await this.connection<TranscriptRecord>(this.TABLE_NAME)
      .select('*')
      .where(this.ACCOUNT_EMAIL_NAME, accountEmail);
    return result;
  }

  public async putTranscript(record: TranscriptRecord) {
    await this.connection<TranscriptRecord>(this.TABLE_NAME)
      .insert(record);
  }

  public async updateTranscript(record: TranscriptRecord) {
    await this.connection<TranscriptRecord>(this.TABLE_NAME)
      .update(record)
      .where(this.ID_NAME, record.transcriptId);
  }

  public async deleteTranscript(transcriptId: string) {
    await this.connection<TranscriptRecord>(this.TABLE_NAME)
      .delete()
      .where(this.ID_NAME, transcriptId);
  }

}
