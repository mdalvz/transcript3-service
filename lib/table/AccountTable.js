"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTable = void 0;
const BaseTable_1 = require("./BaseTable");
class AccountTable extends BaseTable_1.BaseTable {
    constructor() {
        super();
        this.TABLE_NAME = 'accounts';
        this.ACCOUNT_EMAIL = 'accountEmail';
        this.ACCOUNT_PASSWORD_HASH = 'accountPasswordHash';
        this.ACCOUNT_PASSWORD_SALT = 'accountPasswordSalt';
        this.ACCOUNT_ACTIVATED = 'accountActivated';
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.connection.schema.hasTable(this.TABLE_NAME))) {
                yield this.connection.schema.createTable(this.TABLE_NAME, (table) => {
                    table.text(this.ACCOUNT_EMAIL).primary();
                    table.text(this.ACCOUNT_PASSWORD_HASH);
                    table.text(this.ACCOUNT_PASSWORD_SALT);
                    table.integer(this.ACCOUNT_ACTIVATED);
                });
            }
        });
    }
    getAccount(accountEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection(this.TABLE_NAME)
                .select('*')
                .where(this.ACCOUNT_EMAIL, accountEmail);
            if (result.length === 0) {
                throw new Error('Account does not exist');
            }
            return result[0];
        });
    }
    putAccount(record) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection(this.TABLE_NAME)
                .select('*')
                .where(this.ACCOUNT_EMAIL, record.accountEmail);
            if (result.length !== 0) {
                throw new Error('Account email already in use');
            }
            yield this.connection(this.TABLE_NAME)
                .insert(record);
        });
    }
}
AccountTable.instance = new AccountTable();
exports.AccountTable = AccountTable;
