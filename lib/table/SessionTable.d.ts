import { SessionRecord } from '../record/SessionRecord';
import { BaseTable } from './BaseTable';
export declare class SessionTable extends BaseTable {
    static readonly instance: SessionTable;
    private readonly TABLE_NAME;
    private readonly SESSION_TOKEN;
    private readonly ACCOUNT_EMAIL;
    private readonly EXPIRATION_DATE;
    constructor();
    initialize(): Promise<void>;
    getSession(sessionToken: string): Promise<SessionRecord>;
    putSession(record: SessionRecord): Promise<void>;
    updateSession(record: SessionRecord): Promise<void>;
}
