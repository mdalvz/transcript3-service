"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTable = void 0;
var knex_1 = require("knex");
var BaseTable = /** @class */ (function () {
    function BaseTable() {
        this.connection = (0, knex_1.knex)({
            client: 'better-sqlite3',
            connection: {
                filename: './data.db',
            },
        });
    }
    return BaseTable;
}());
exports.BaseTable = BaseTable;
