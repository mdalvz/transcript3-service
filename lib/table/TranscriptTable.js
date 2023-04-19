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
exports.TranscriptTable = void 0;
const BaseTable_1 = require("./BaseTable");
class TranscriptTable extends BaseTable_1.BaseTable {
    constructor() {
        super();
        this.TABLE_NAME = 'transcripts';
        this.TRANSCRIPT_ID = 'transcriptId';
        this.ACCOUNT_EMAIL = 'accountEmail';
        this.IS_K12 = 'isK12';
        this.SCHOOL_NAME = 'schoolName';
        this.SCHOOL_ADDRESS = 'schoolAddress';
        this.ADMIN_TITLE = 'adminTitle';
        this.ADMIN_NAME = 'adminName';
        this.ADMIN_PHONE = 'adminPhone';
        this.ADMIN_EMAIL = 'adminEmail';
        this.STUDENT_NAME_FIRST = 'studentNameFirst';
        this.STUDENT_NAME_MIDDLE = 'studentNameMiddle';
        this.STUDENT_NAME_LAST = 'studentNameLast';
        this.STUDENT_NAME_SUFFIX = 'studentNameSuffix';
        this.STUDENT_BIRTH_DATE = 'studentBirthDate';
        this.STUDENT_GRADUATION_DATE = 'studentGraduationDate';
        this.STUDENT_ADDRESS = 'studentAddress';
        this.STUDENT_PHONE = 'studentPhone';
        this.STUDENT_EMAIL = 'studentEmail';
        this.TRANSCRIPT_TITLE = 'transcriptTitle';
        this.TRANSCRIPT_LOGO = 'transcriptLogo';
        this.ARRANGE_BY_GRADE = 'arrangeByGrade';
        this.WEIGHTED_GPA = 'computeWeightedGPA';
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.connection.schema.hasTable(this.TABLE_NAME))) {
                yield this.connection.schema.createTable(this.TABLE_NAME, (table) => {
                    table.text(this.TRANSCRIPT_ID).primary();
                    table.text(this.ACCOUNT_EMAIL);
                    table.integer(this.IS_K12);
                    table.text(this.SCHOOL_NAME);
                    table.text(this.SCHOOL_ADDRESS);
                    table.text(this.ADMIN_TITLE);
                    table.text(this.ADMIN_NAME);
                    table.text(this.ADMIN_PHONE);
                    table.text(this.ADMIN_EMAIL);
                    table.text(this.STUDENT_NAME_FIRST);
                    table.text(this.STUDENT_NAME_LAST);
                    table.text(this.STUDENT_NAME_MIDDLE);
                    table.text(this.STUDENT_NAME_SUFFIX);
                    table.text(this.STUDENT_BIRTH_DATE);
                    table.text(this.STUDENT_GRADUATION_DATE);
                    table.text(this.STUDENT_ADDRESS);
                    table.text(this.STUDENT_PHONE);
                    table.text(this.STUDENT_EMAIL);
                    table.text(this.TRANSCRIPT_TITLE);
                    table.text(this.TRANSCRIPT_LOGO);
                    table.integer(this.ARRANGE_BY_GRADE);
                    table.integer(this.WEIGHTED_GPA);
                    table.index([this.ACCOUNT_EMAIL]);
                });
            }
        });
    }
    listTranscripts(accountEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection(this.TABLE_NAME)
                .select('*')
                .where(this.ACCOUNT_EMAIL, accountEmail);
            return result;
        });
    }
    getTranscript(transcriptId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.connection(this.TABLE_NAME)
                .select('*')
                .where(this.TRANSCRIPT_ID, transcriptId);
            if (result.length === 0) {
                throw new Error('Transcript does not exist');
            }
            return result[0];
        });
    }
    putTranscript(record) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection(this.TABLE_NAME)
                .insert(record);
        });
    }
    updateTranscript(record) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection(this.TABLE_NAME)
                .update(record)
                .where(this.TRANSCRIPT_ID, record.transcriptId);
        });
    }
    deleteTranscript(transcriptId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection(this.TABLE_NAME)
                .delete()
                .where(this.TRANSCRIPT_ID, transcriptId);
        });
    }
}
TranscriptTable.instance = new TranscriptTable();
exports.TranscriptTable = TranscriptTable;
