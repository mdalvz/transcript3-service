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
exports.createAccountHandler = exports.createAccount = void 0;
const md5 = require("md5");
const uuid_1 = require("uuid");
const transcript3_model_1 = require("transcript3-model");
const Common_1 = require("./Common");
const AccountTable_1 = require("../table/AccountTable");
function createAccount(request) {
    return __awaiter(this, void 0, void 0, function* () {
        let accountPasswordSalt = (0, uuid_1.v4)();
        let accountPasswordHash = md5(request.accountPassword + accountPasswordSalt);
        yield AccountTable_1.AccountTable.instance.putAccount({
            accountEmail: request.accountEmail,
            accountPasswordHash,
            accountPasswordSalt,
        });
        return {};
    });
}
exports.createAccount = createAccount;
exports.createAccountHandler = (0, Common_1.operationHandler)(createAccount, transcript3_model_1.CreateAccountRequestSchema);
