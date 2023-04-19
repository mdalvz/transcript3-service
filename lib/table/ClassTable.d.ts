import { ClassRecord } from '../record/ClassRecord';
import { BaseTable } from './BaseTable';
export declare class ClassTable extends BaseTable {
    static readonly instance: ClassTable;
    private readonly TABLE_NAME;
    private readonly CLASS_ID;
    private readonly TRANSCRIPT_ID;
    private readonly SUBJECT;
    private readonly NAME;
    private readonly LEVEL;
    private readonly TERM;
    private readonly YEAR;
    private readonly PROVIDER;
    private readonly TYPE;
    private readonly GRADE;
    private readonly AWARDED;
    private readonly ATTEMPTED;
    constructor();
    initialize(): Promise<void>;
    listClasses(transcriptId: string): Promise<ClassRecord[]>;
    putClass(record: ClassRecord): Promise<void>;
    updateClass(record: ClassRecord): Promise<void>;
    deleteClass(classId: string): Promise<void>;
}
