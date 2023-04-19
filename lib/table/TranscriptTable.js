"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriptTable = void 0;
var BaseTable_1 = require("./BaseTable");
var TranscriptTable = exports.TranscriptTable = /** @class */ (function (_super) {
    __extends(TranscriptTable, _super);
    function TranscriptTable() {
        var _this = _super.call(this) || this;
        _this.TABLE_NAME = 'transcripts';
        _this.TRANSCRIPT_ID = 'transcriptId';
        _this.ACCOUNT_EMAIL = 'accountEmail';
        _this.SCHOOL_NAME = 'schoolName';
        _this.SCHOOL_ADDRESS = 'schoolAddress';
        _this.ADMIN_TITLE = 'adminTitle';
        _this.ADMIN_NAME = 'adminName';
        _this.ADMIN_PHONE = 'adminPhone';
        _this.ADMIN_EMAIL = 'adminEmail';
        _this.STUDENT_NAME_FIRST = 'studentNameFirst';
        _this.STUDENT_NAME_MIDDLE = 'studentNameMiddle';
        _this.STUDENT_NAME_LAST = 'studentNameLast';
        _this.STUDENT_NAME_SUFFIX = 'studentNameSuffix';
        _this.STUDENT_BIRTH_DATE = 'studentBirthDate';
        _this.STUDENT_ADDRESS = 'studentAddress';
        _this.STUDENT_PHONE = 'studentPhone';
        _this.STUDENT_EMAIL = 'studentEmail';
        _this.TRANSCRIPT_TITLE = 'transcriptTitle';
        _this.TRANSCRIPT_LOGO = 'transcriptLogo';
        _this.ARRANGE_BY_GRADE = 'arrangeByGrade';
        _this.WEIGHTED_GPA = 'computeWeightedGPA';
        return _this;
    }
    TranscriptTable.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection.schema.hasTable(this.TABLE_NAME)];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.connection.schema.createTable(this.TABLE_NAME, function (table) {
                                table.text(_this.TRANSCRIPT_ID).primary();
                                table.text(_this.ACCOUNT_EMAIL);
                                table.text(_this.SCHOOL_NAME);
                                table.text(_this.SCHOOL_ADDRESS);
                                table.text(_this.ADMIN_TITLE);
                                table.text(_this.ADMIN_NAME);
                                table.text(_this.ADMIN_PHONE);
                                table.text(_this.ADMIN_EMAIL);
                                table.text(_this.STUDENT_NAME_FIRST);
                                table.text(_this.STUDENT_NAME_LAST);
                                table.text(_this.STUDENT_NAME_MIDDLE);
                                table.text(_this.STUDENT_NAME_SUFFIX);
                                table.text(_this.STUDENT_BIRTH_DATE);
                                table.text(_this.STUDENT_ADDRESS);
                                table.text(_this.STUDENT_PHONE);
                                table.text(_this.STUDENT_EMAIL);
                                table.text(_this.TRANSCRIPT_TITLE);
                                table.text(_this.TRANSCRIPT_LOGO);
                                table.boolean(_this.ARRANGE_BY_GRADE);
                                table.boolean(_this.WEIGHTED_GPA);
                                table.index([_this.ACCOUNT_EMAIL]);
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TranscriptTable.prototype.listTranscripts = function (accountEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection(this.TABLE_NAME)
                            .select('*')
                            .where(this.ACCOUNT_EMAIL, accountEmail)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    TranscriptTable.prototype.putTranscript = function (record) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection(this.TABLE_NAME)
                            .insert(record)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TranscriptTable.prototype.updateTranscript = function (record) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection(this.TABLE_NAME)
                            .update(record)
                            .where(this.TRANSCRIPT_ID, record.transcriptId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TranscriptTable.prototype.deleteTranscript = function (transcriptId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connection(this.TABLE_NAME)
                            .delete()
                            .where(this.TRANSCRIPT_ID, transcriptId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TranscriptTable.instance = new TranscriptTable();
    return TranscriptTable;
}(BaseTable_1.BaseTable));
