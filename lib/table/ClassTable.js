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
exports.ClassTable = void 0;
const BaseTable_1 = require("./BaseTable");
class ClassTable extends BaseTable_1.BaseTable {
    constructor() {
        super();
        this.TABLE_NAME = 'classes';
        this.CLASS_ID = 'classId';
        this.TRANSCRIPT_ID = 'transcriptId';
        this.SUBJECT = 'subject';
        this.NAME = 'name';
        this.LEVEL = 'level';
        this.TERM = 'term';
        this.YEAR = 'year';
        this.PROVIDER = 'provider';
        this.TYPE = 'type';
        this.GRADE = 'grade';
        this.AWARDED = 'awarded';
        this.ATTEMPTED = 'attempted';
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.connection.schema.hasTable(this.TABLE_NAME))) {
                yield this.connection.schema.createTable(this.TABLE_NAME, (table) => {
                    table.text(this.CLASS_ID).primary();
                    table.text(this.TRANSCRIPT_ID);
                    table.text(this.SUBJECT);
                    table.text(this.NAME);
                    table.integer(this.LEVEL);
                    table.text(this.TERM);
                    table.text(this.YEAR);
                    table.text(this.PROVIDER);
                    table.text(this.TYPE);
                    table.text(this.GRADE);
                    table.integer(this.AWARDED);
                    table.integer(this.ATTEMPTED);
                    table.index([this.TRANSCRIPT_ID]);
                });
            }
        });
    }
    listClasses(transcriptId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection(this.TABLE_NAME)
                .select('*')
                .where(this.TRANSCRIPT_ID, transcriptId);
            return result.map((e, i, a) => this.fromInternal(e));
        });
    }
    putClass(record) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection(this.TABLE_NAME)
                .insert(this.toInternal(record));
        });
    }
    updateClass(record) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection(this.TABLE_NAME)
                .update(this.toInternal(record))
                .where(this.CLASS_ID, record.classId);
        });
    }
    deleteClass(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection(this.TABLE_NAME)
                .delete()
                .where(this.CLASS_ID, classId);
        });
    }
    getClass(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection(this.TABLE_NAME)
                .select('*')
                .where(this.CLASS_ID, classId);
            if (result.length === 0) {
                throw new Error('Class does not exist');
            }
            return this.fromInternal(result[0]);
        });
    }
    fromInternal(record) {
        return Object.assign(Object.assign({}, record), { type: JSON.parse(record.type) });
    }
    toInternal(record) {
        return Object.assign(Object.assign({}, record), { type: JSON.stringify(record.type) });
    }
}
ClassTable.instance = new ClassTable();
exports.ClassTable = ClassTable;
