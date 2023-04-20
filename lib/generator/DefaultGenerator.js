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
exports.DefaultGenerator = void 0;
const BaseGenerator_1 = require("./BaseGenerator");
class DefaultGenerator extends BaseGenerator_1.BaseGenerator {
    constructor(account, transcript) {
        super(account, transcript);
    }
    onGenerate() {
        return __awaiter(this, void 0, void 0, function* () {
            let x = this.document.createElement('div');
            x.innerHTML = 'hello world!';
            this.document.body.appendChild(x);
        });
    }
}
exports.DefaultGenerator = DefaultGenerator;
