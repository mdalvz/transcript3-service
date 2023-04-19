import { TranscriptRecord } from '../record/TranscriptRecord';
import { BaseTable } from './BaseTable';

export class TranscriptTable extends BaseTable {

  public static readonly instance = new TranscriptTable();

  private readonly TABLE_NAME = 'transcripts';

  private readonly TRANSCRIPT_ID        = 'transcriptId';
  private readonly ACCOUNT_EMAIL        = 'accountEmail';
  private readonly SCHOOL_NAME          = 'schoolName';
  private readonly SCHOOL_ADDRESS       = 'schoolAddress';
  private readonly ADMIN_TITLE          = 'adminTitle';
  private readonly ADMIN_NAME           = 'adminName';
  private readonly ADMIN_PHONE          = 'adminPhone';
  private readonly ADMIN_EMAIL          = 'adminEmail';
  private readonly STUDENT_NAME_FIRST   = 'studentNameFirst';
  private readonly STUDENT_NAME_MIDDLE  = 'studentNameMiddle';
  private readonly STUDENT_NAME_LAST    = 'studentNameLast';
  private readonly STUDENT_NAME_SUFFIX  = 'studentNameSuffix';
  private readonly STUDENT_BIRTH_DATE   = 'studentBirthDate';
  private readonly STUDENT_ADDRESS      = 'studentAddress';
  private readonly STUDENT_PHONE        = 'studentPhone';
  private readonly STUDENT_EMAIL        = 'studentEmail';
  private readonly TRANSCRIPT_TITLE     = 'transcriptTitle';
  private readonly TRANSCRIPT_LOGO      = 'transcriptLogo';
  private readonly ARRANGE_BY_GRADE     = 'arrangeByGrade';
  private readonly WEIGHTED_GPA         = 'computeWeightedGPA';

  public constructor() {
    super();
  }

  public async initialize(): Promise<void> {
    if (!await this.connection.schema.hasTable(this.TABLE_NAME)) {
      await this.connection.schema.createTable(this.TABLE_NAME, (table) => {
        table.text(this.TRANSCRIPT_ID).primary();
        table.text(this.ACCOUNT_EMAIL);
        table.text(this.SCHOOL_NAME);
        table.text(this.SCHOOL_ADDRESS);
        table.text(this.ADMIN_TITLE);
        table.text(this.ADMIN_NAME);
        table.text(this.ADMIN_PHONE);
        table.text(this.ADMIN_EMAIL);
        table.text(this.STUDENT_NAME_FIRST);
        table.text(this.STUDENT_NAME_LAST);
        table.text(this.STUDENT_NAME_MIDDLE);
        table.text(this.STUDENT_NAME_SUFFIX);
        table.text(this.STUDENT_BIRTH_DATE);
        table.text(this.STUDENT_ADDRESS);
        table.text(this.STUDENT_PHONE);
        table.text(this.STUDENT_EMAIL);
        table.text(this.TRANSCRIPT_TITLE);
        table.text(this.TRANSCRIPT_LOGO);
        table.boolean(this.ARRANGE_BY_GRADE);
        table.boolean(this.WEIGHTED_GPA);
        table.index([this.ACCOUNT_EMAIL]);
      });
    }
  }

  public async listTranscripts(accountEmail: string): Promise<TranscriptRecord[]> {
    let result = await this.connection<TranscriptRecord>(this.TABLE_NAME)
      .select('*')
      .where(this.ACCOUNT_EMAIL, accountEmail);
    return result;
  }

  public async getTranscript(transcriptId: string): Promise<TranscriptRecord> {
    let result = await this.connection<TranscriptRecord>(this.TABLE_NAME)
      .select('*')
      .where(this.TRANSCRIPT_ID, transcriptId);
    if (result.length === 0) {
      throw new Error('Transcript does not exist');
    }
    return result[0];
  }

  public async putTranscript(record: TranscriptRecord) {
    await this.connection<TranscriptRecord>(this.TABLE_NAME)
      .insert(record);
  }

  public async updateTranscript(record: TranscriptRecord) {
    await this.connection<TranscriptRecord>(this.TABLE_NAME)
      .update(record)
      .where(this.TRANSCRIPT_ID, record.transcriptId);
  }

  public async deleteTranscript(transcriptId: string) {
    await this.connection<TranscriptRecord>(this.TABLE_NAME)
      .delete()
      .where(this.TRANSCRIPT_ID, transcriptId);
  }

}
