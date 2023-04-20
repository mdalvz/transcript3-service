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
exports.BaseGenerator = void 0;
const jsdom_1 = require("jsdom");
const DocumentManager_1 = require("../manager/DocumentManager");
class BaseGenerator {
    constructor(account, transcript) {
        this.jsdom = new jsdom_1.JSDOM();
        this.document = this.jsdom.window.document;
        this.account = account;
        this.transcript = transcript;
    }
    generate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onGenerate();
            let html = this.jsdom.serialize();
            return yield DocumentManager_1.DocumentManager.instance.createDocument(html);
        });
    }
}
exports.BaseGenerator = BaseGenerator;
