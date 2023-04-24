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
exports.DocumentManager = void 0;
const uuid_1 = require("uuid");
const promises_1 = require("fs/promises");
const promises_2 = require("timers/promises");
const puppeteer = require("puppeteer");
const MediaManager_1 = require("./MediaManager");
const DocumentTable_1 = require("../table/DocumentTable");
class DocumentManager extends MediaManager_1.MediaManager {
    initialize() {
        const _super = Object.create(null, {
            initialize: { get: () => super.initialize }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.initialize.call(this);
            yield this.initializeDirectory(DocumentManager.DOCUMENT_DIRECTORY);
            // DO NOT AWAIT THIS
            this.initializeDirectoryCleaner();
        });
    }
    createDocument(html) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = yield this.createDocumentRecord();
            const browser = yield puppeteer.launch();
            const page = yield browser.newPage();
            yield page.setContent(html, { waitUntil: 'load' });
            yield page.emulateMediaType('print');
            yield page.pdf({
                path,
                margin: { top: '0.25in', right: '0.25in', bottom: '0.25in', left: '0.25in' },
                printBackground: true,
                format: 'A4',
            });
            yield browser.close();
            return path;
        });
    }
    createDocumentRecord() {
        return __awaiter(this, void 0, void 0, function* () {
            let record = {
                documentId: (0, uuid_1.v4)(),
                documentName: DocumentManager.DOCUMENT_DIRECTORY + '/' + (0, uuid_1.v4)() + '.pdf',
                expirationDate: new Date().getTime() + 1000 * 60 * 60 * 24,
            };
            yield DocumentTable_1.DocumentTable.instance.putDocument(record);
            return record.documentName;
        });
    }
    initializeDirectoryCleaner() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                try {
                    let expired = yield DocumentTable_1.DocumentTable.instance.listExpiredDocuments();
                    for (let document of expired) {
                        try {
                            yield DocumentTable_1.DocumentTable.instance.deleteDocument(document.documentId);
                            yield (0, promises_1.rm)(document.documentName);
                        }
                        catch (_) {
                            //
                        }
                    }
                }
                catch (_) {
                    //
                }
                yield (0, promises_2.setTimeout)(1000);
            }
        });
    }
}
DocumentManager.instance = new DocumentManager();
DocumentManager.DOCUMENT_DIRECTORY = `${MediaManager_1.MediaManager.MEDIA_DIRECTORY}/documents`;
exports.DocumentManager = DocumentManager;
