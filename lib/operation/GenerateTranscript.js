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
exports.generateTranscriptHandler = exports.generateTranscript = void 0;
const transcript3_model_1 = require("transcript3-model");
const Common_1 = require("./Common");
const TranscriptTable_1 = require("../table/TranscriptTable");
const DefaultGenerator_1 = require("../generator/DefaultGenerator");
const AccountTable_1 = require("../table/AccountTable");
const ClassTable_1 = require("../table/ClassTable");
function generateTranscript(request, accountEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        let transcript = yield TranscriptTable_1.TranscriptTable.instance.getTranscript(request.transcriptId);
        if (transcript.accountEmail !== accountEmail) {
            throw new Error('Transcript is owned by another account');
        }
        let classes = yield ClassTable_1.ClassTable.instance.listClasses(request.transcriptId);
        let account = yield AccountTable_1.AccountTable.instance.getAccount(accountEmail);
        let generator = new DefaultGenerator_1.DefaultGenerator(account, transcript, classes);
        let documentName = yield generator.generate();
        return {
            // Kind of a hack to remove the '.'
            documentName: documentName.substring(1),
        };
    });
}
exports.generateTranscript = generateTranscript;
exports.generateTranscriptHandler = (0, Common_1.authenticatedOperationHandler)(generateTranscript, transcript3_model_1.GenerateTranscriptRequestSchema);
