import { AccountRecord } from '../record/AccountRecord';
import { ClassRecord } from '../record/ClassRecord';
import { TranscriptRecord } from '../record/TranscriptRecord';
import { BaseGenerator } from './BaseGenerator';
export declare class DefaultGenerator extends BaseGenerator {
    constructor(account: AccountRecord, transcript: TranscriptRecord, classes: ClassRecord[]);
    onGenerate(): Promise<void>;
    private generateWatermark;
    private generateRoot;
    private generateHeader;
    private generateInformation;
    private generateStudentInformation;
    private generateStudentName;
    private generateStudentGraduationDate;
    private generateSchoolInformation;
    private generateInformationEntry;
    private generateCoursework;
    private generateCourseworkBySubject;
    private generateCourseworkHeaderCell;
    private generateCourseworkCell;
}
