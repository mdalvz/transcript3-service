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
exports.SessionTable = void 0;
const BaseTable_1 = require("./BaseTable");
class SessionTable extends BaseTable_1.BaseTable {
    constructor() {
        super();
        this.TABLE_NAME = 'sessions';
        this.SESSION_TOKEN = 'sessionToken';
        this.ACCOUNT_EMAIL = 'accountEmail';
        this.EXPIRATION_DATE = 'expirationDate';
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.connection.schema.hasTable(this.TABLE_NAME))) {
                yield this.connection.schema.createTable(this.TABLE_NAME, (table) => {
                    table.text(this.SESSION_TOKEN).primary();
                    table.text(this.ACCOUNT_EMAIL);
                    table.bigInteger(this.EXPIRATION_DATE);
                });
            }
        });
    }
    getSession(sessionToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection(this.TABLE_NAME)
                .select('*')
                .where(this.SESSION_TOKEN, sessionToken)
                .andWhere(this.EXPIRATION_DATE, '>', new Date().getTime());
            if (result.length === 0) {
                throw new Error('Session does not exist');
            }
            return result[0];
        });
    }
    putSession(record) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection(this.TABLE_NAME)
                .insert(record);
        });
    }
    updateSession(record) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection(this.TABLE_NAME)
                .update(record)
                .where(this.SESSION_TOKEN, record.sessionToken);
        });
    }
}
SessionTable.instance = new SessionTable();
exports.SessionTable = SessionTable;
