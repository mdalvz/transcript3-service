import { AccountRecord } from '../record/AccountRecord';
import { TranscriptRecord } from '../record/TranscriptRecord';
export declare abstract class BaseGenerator {
    private readonly jsdom;
    protected readonly document: Document;
    protected readonly account: AccountRecord;
    protected readonly transcript: TranscriptRecord;
    constructor(account: AccountRecord, transcript: TranscriptRecord);
    protected abstract onGenerate(): Promise<void>;
    generate(): Promise<string>;
}
