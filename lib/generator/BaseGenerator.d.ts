import { AccountRecord } from '../record/AccountRecord';
import { TranscriptRecord } from '../record/TranscriptRecord';
import { ClassRecord } from '../record/ClassRecord';
export declare abstract class BaseGenerator {
    private readonly jsdom;
    protected readonly document: Document;
    protected readonly account: AccountRecord;
    protected readonly transcript: TranscriptRecord;
    protected readonly classes: ClassRecord[];
    constructor(account: AccountRecord, transcript: TranscriptRecord, classes: ClassRecord[]);
    protected abstract onGenerate(): Promise<void>;
    generate(): Promise<string>;
}
