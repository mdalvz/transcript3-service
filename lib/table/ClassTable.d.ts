import { ClassRecord } from '../record/ClassRecord';
import { BaseTable } from './BaseTable';
export declare class ClassTable extends BaseTable {
    static readonly instance: ClassTable;
    private readonly TABLE_NAME;
    private readonly ID_NAME;
    private readonly TRANSCRIPT_ID_NAME;
    private readonly SUBJECT_NAME;
    private readonly NAME_NAME;
    private readonly LEVEL_NAME;
    private readonly YEAR_NAME;
    private readonly PROVIDER_NAME;
    private readonly TYPE_NAME;
    private readonly GRADE_NAME;
    private readonly AWARDED_NAME;
    private readonly ATTEMPTED_NAME;
    constructor();
    initialize(): Promise<void>;
    listClasses(transcriptId: string): Promise<ClassRecord[]>;
    putClass(record: ClassRecord): Promise<void>;
    updateClass(record: ClassRecord): Promise<void>;
    deleteClass(classId: string): Promise<void>;
}
