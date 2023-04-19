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
exports.createSessionHandler = exports.createSession = void 0;
const md5 = require("md5");
const uuid_1 = require("uuid");
const transcript3_model_1 = require("transcript3-model");
const Common_1 = require("./Common");
const AccountTable_1 = require("../table/AccountTable");
const SessionTable_1 = require("../table/SessionTable");
function getSessionExpirationDate() {
    return new Date().getTime() + 1000 * 60 * 60 * 24;
}
function createSession(request) {
    return __awaiter(this, void 0, void 0, function* () {
        let record = yield AccountTable_1.AccountTable.instance.getAccount(request.accountEmail);
        let calculatedHash = md5(request.accountPassword + record.accountPasswordSalt);
        if (calculatedHash !== record.accountPasswordHash) {
            throw new Error('Incorrect password');
        }
        let sessionToken = (0, uuid_1.v4)();
        yield SessionTable_1.SessionTable.instance.putSession({
            sessionToken,
            accountEmail: record.accountEmail,
            expirationDate: getSessionExpirationDate(),
        });
        return {
            sessionToken,
        };
    });
}
exports.createSession = createSession;
exports.createSessionHandler = (0, Common_1.operationHandler)(createSession, transcript3_model_1.CreateSessionRequestSchema);
