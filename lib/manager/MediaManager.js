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
exports.MediaManager = void 0;
const promises_1 = require("fs/promises");
const BaseManager_1 = require("./BaseManager");
class MediaManager extends BaseManager_1.BaseManager {
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initializeDirectory(MediaManager.MEDIA_DIRECTORY);
        });
    }
    initializeDirectory(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, promises_1.access)(path);
            }
            catch (_) {
                yield (0, promises_1.mkdir)(path);
            }
        });
    }
}
MediaManager.MEDIA_DIRECTORY = './media';
exports.MediaManager = MediaManager;
