import { AccountRecord } from '../record/AccountRecord';
import { TranscriptRecord } from '../record/TranscriptRecord';
import { BaseGenerator } from './BaseGenerator';
export declare class DefaultGenerator extends BaseGenerator {
    constructor(account: AccountRecord, transcript: TranscriptRecord);
    onGenerate(): Promise<void>;
    private generateRoot;
    private generateHeader;
    private generateInformation;
    private generateStudentInformation;
    private generateStudentName;
    private generateStudentGraduationDate;
    private generateSchoolInformation;
    private generateInformationEntry;
}
