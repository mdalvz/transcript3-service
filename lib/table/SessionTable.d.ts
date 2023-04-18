import { SessionRecord } from '../record/SessionRecord';
import { BaseTable } from './BaseTable';
export declare class SessionTable extends BaseTable {
    static readonly instance: SessionTable;
    private readonly TABLE_NAME;
    private readonly ID_NAME;
    private readonly EMAIL_NAME;
    private readonly EXPIRATION_NAME;
    constructor();
    initialize(): Promise<void>;
    getSession(sessionToken: string): Promise<SessionRecord>;
    putSession(record: SessionRecord): Promise<void>;
    updateSession(record: SessionRecord): Promise<void>;
}
