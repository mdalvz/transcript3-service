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
exports.listClassesHandler = exports.listClasses = void 0;
const transcript3_model_1 = require("transcript3-model");
const Common_1 = require("./Common");
const TranscriptTable_1 = require("../table/TranscriptTable");
const ClassTable_1 = require("../table/ClassTable");
function listClasses(request, accountEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        let transcript = yield TranscriptTable_1.TranscriptTable.instance.getTranscript(request.transcriptId);
        if (transcript.accountEmail !== accountEmail) {
            throw new Error('Transcript is owned by another account');
        }
        return yield ClassTable_1.ClassTable.instance.listClasses(request.transcriptId);
    });
}
exports.listClasses = listClasses;
exports.listClassesHandler = (0, Common_1.authenticatedOperationHandler)(listClasses, transcript3_model_1.ListClassesRequestSchema);
