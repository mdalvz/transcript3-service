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
const express = require("express");
const cors = require("cors");
const transcript3_model_1 = require("transcript3-model");
const AccountTable_1 = require("./table/AccountTable");
const SessionTable_1 = require("./table/SessionTable");
const ClassTable_1 = require("./table/ClassTable");
const CreateSession_1 = require("./operation/CreateSession");
const CreateAccount_1 = require("./operation/CreateAccount");
const CreateTranscript_1 = require("./operation/CreateTranscript");
const DeleteTranscript_1 = require("./operation/DeleteTranscript");
const ListTranscripts_1 = require("./operation/ListTranscripts");
const UpdateTranscript_1 = require("./operation/UpdateTranscript");
const GetTranscript_1 = require("./operation/GetTranscript");
const CreateClass_1 = require("./operation/CreateClass");
const DeleteClass_1 = require("./operation/DeleteClass");
const ListClasses_1 = require("./operation/ListClasses");
const UpdateClass_1 = require("./operation/UpdateClass");
const TranscriptTable_1 = require("./table/TranscriptTable");
const DocumentTable_1 = require("./table/DocumentTable");
const DocumentManager_1 = require("./manager/DocumentManager");
const MediaManager_1 = require("./manager/MediaManager");
const promises_1 = require("fs/promises");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield AccountTable_1.AccountTable.instance.initialize();
        yield SessionTable_1.SessionTable.instance.initialize();
        yield ClassTable_1.ClassTable.instance.initialize();
        yield TranscriptTable_1.TranscriptTable.instance.initialize();
        yield DocumentTable_1.DocumentTable.instance.initialize();
        yield DocumentManager_1.DocumentManager.instance.initialize();
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use('/media', express.static(MediaManager_1.MediaManager.MEDIA_DIRECTORY));
        yield DocumentManager_1.DocumentManager.instance.createDocument(yield (0, promises_1.readFile)('template.html', 'utf8'));
        app.post(transcript3_model_1.CreateAccountResource, CreateAccount_1.createAccountHandler);
        app.post(transcript3_model_1.CreateSessionResource, CreateSession_1.createSessionHandler);
        app.post(transcript3_model_1.CreateTranscriptResource, CreateTranscript_1.createTranscriptHandler);
        app.post(transcript3_model_1.DeleteTranscriptResource, DeleteTranscript_1.deleteTranscriptHandler);
        app.post(transcript3_model_1.ListTranscriptsResource, ListTranscripts_1.listTranscriptsHandler);
        app.post(transcript3_model_1.UpdateTranscriptResource, UpdateTranscript_1.updateTranscriptHandler);
        app.post(transcript3_model_1.GetTranscriptResource, GetTranscript_1.getTranscriptHandler);
        app.post(transcript3_model_1.CreateClassResource, CreateClass_1.createClassHandler);
        app.post(transcript3_model_1.DeleteClassResource, DeleteClass_1.deleteClassHandler);
        app.post(transcript3_model_1.UpdateClassResource, UpdateClass_1.updateClassHandler);
        app.post(transcript3_model_1.ListClassesResource, ListClasses_1.listClassesHandler);
        console.log('Started transcript3-service');
        app.listen(3000);
    });
}
main();
