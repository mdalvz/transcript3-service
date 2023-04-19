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
exports.DocumentTable = void 0;
const BaseTable_1 = require("./BaseTable");
class DocumentTable extends BaseTable_1.BaseTable {
    constructor() {
        super();
        this.TABLE_NAME = 'documents';
        this.DOCUMENT_ID = 'documentId';
        this.DOCUMENT_NAME = 'documentName';
        this.EXPIRATION_DATE = 'expirationDate';
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.connection.schema.hasTable(this.TABLE_NAME))) {
                yield this.connection.schema.createTable(this.TABLE_NAME, (table) => {
                    table.text(this.DOCUMENT_ID).primary();
                    table.text(this.DOCUMENT_NAME);
                    table.bigInteger(this.EXPIRATION_DATE);
                });
            }
        });
    }
    putDocument(record) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection(this.TABLE_NAME)
                .insert(record);
        });
    }
    listExpiredDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.connection(this.TABLE_NAME)
                .select('*')
                .where(this.EXPIRATION_DATE, '<', new Date().getTime());
        });
    }
    deleteDocument(documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection(this.TABLE_NAME)
                .delete()
                .where(this.DOCUMENT_ID, documentId);
        });
    }
}
DocumentTable.instance = new DocumentTable();
exports.DocumentTable = DocumentTable;
