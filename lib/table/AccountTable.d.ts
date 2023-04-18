import { AccountRecord } from '../record/AccountRecord';
import { BaseTable } from './BaseTable';
export declare class AccountTable extends BaseTable {
    static readonly instance: AccountTable;
    private readonly TABLE_NAME;
    private readonly EMAIL_NAME;
    private readonly HASH_NAME;
    private readonly SALT_NAME;
    constructor();
    initialize(): Promise<void>;
    getAccount(accountEmail: string): Promise<AccountRecord>;
    putAccount(record: AccountRecord): Promise<void>;
}
