import { AccountRecord } from '../record/AccountRecord';
import { BaseTable } from './BaseTable';
export declare class AccountTable extends BaseTable {
    static readonly instance: AccountTable;
    private readonly tableName;
    constructor();
    initialize(): Promise<void>;
    getAccount(accountEmail: string): Promise<AccountRecord>;
    putAccount(record: AccountRecord): Promise<void>;
}
