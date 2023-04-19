import { AccountRecord } from '../record/AccountRecord';
import { BaseTable } from './BaseTable';
export declare class AccountTable extends BaseTable {
    static readonly instance: AccountTable;
    private readonly TABLE_NAME;
    private readonly ACCOUNT_EMAIL;
    private readonly ACCOUNT_PASSWORD_HASH;
    private readonly ACCOUNT_PASSWORD_SALT;
    constructor();
    initialize(): Promise<void>;
    getAccount(accountEmail: string): Promise<AccountRecord>;
    putAccount(record: AccountRecord): Promise<void>;
}
