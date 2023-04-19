"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTable = void 0;
const knex_1 = require("knex");
class BaseTable {
    constructor() {
        this.connection = (0, knex_1.knex)({
            client: 'better-sqlite3',
            connection: {
                filename: './data.db',
            },
            useNullAsDefault: true,
        });
    }
}
exports.BaseTable = BaseTable;
