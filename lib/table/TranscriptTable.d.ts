import { TranscriptRecord } from '../record/TranscriptRecord';
import { BaseTable } from './BaseTable';
export declare class TranscriptTable extends BaseTable {
    static readonly instance: TranscriptTable;
    private readonly TABLE_NAME;
    private readonly ID_NAME;
    private readonly ACCOUNT_EMAIL_NAME;
    private readonly SCHOOL_NAME;
    private readonly SCHOOL_ADDRESS_NAME;
    private readonly ADMIN_TITLE_NAME;
    private readonly ADMIN_NAME;
    private readonly ADMIN_PHONE_NAME;
    private readonly ADMIN_EMAIL_NAME;
    private readonly STUDENT_FIRST_NAME;
    private readonly STUDENT_MIDDLE_NAME;
    private readonly STUDENT_LAST_NAME;
    private readonly STUDENT_SUFFIX_NAME;
    private readonly STUDENT_BIRTH_DATE_NAME;
    private readonly STUDENT_ADDRESS_NAME;
    private readonly STUDENT_PHONE_NAME;
    private readonly STUDENT_EMAIL_NAME;
    private readonly TRANSCRIPT_TITLE_NAME;
    private readonly TRANSCRIPT_LOGO_NAME;
    private readonly ARRANGE_BY_GRADE_NAME;
    private readonly WEIGHTED_GPA_NAME;
    constructor();
    initialize(): Promise<void>;
    listTranscripts(accountEmail: string): Promise<TranscriptRecord[]>;
    putTranscript(record: TranscriptRecord): Promise<void>;
    updateTranscript(record: TranscriptRecord): Promise<void>;
    deleteTranscript(transcriptId: string): Promise<void>;
}
