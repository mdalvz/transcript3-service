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
exports.authenticatedOperationHandler = exports.operationHandler = void 0;
const SessionTable_1 = require("../table/SessionTable");
function operationHandler(fn, requestSchema) {
    return function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let requestBody = requestSchema.parse(request.body);
                try {
                    let responseBody = yield fn(requestBody);
                    response.status(200);
                    response.json(responseBody);
                    return;
                }
                catch (error) {
                    if (error instanceof Error) {
                        response.status(400);
                        response.send(error.message);
                        return;
                    }
                    else {
                        response.status(500);
                        response.send('Internal server error');
                        return;
                    }
                }
            }
            catch (_) {
                response.status(400);
                response.send('Invalid request type');
                return;
            }
        });
    };
}
exports.operationHandler = operationHandler;
function authenticatedOperationHandler(fn, requestSchema) {
    return function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let requestBody = requestSchema.parse(request.body);
                try {
                    let { accountEmail } = yield SessionTable_1.SessionTable.instance.getSession(requestBody.sessionToken);
                    try {
                        let responseBody = yield fn(requestBody, accountEmail);
                        response.status(200);
                        response.json(responseBody);
                        return;
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            response.status(400);
                            response.send(error.message);
                            return;
                        }
                        else {
                            response.status(500);
                            response.send('Internal server error');
                            return;
                        }
                    }
                }
                catch (_) {
                    response.status(403);
                    response.send('Invalid session token');
                    return;
                }
            }
            catch (_) {
                response.status(400);
                response.send('Invalid request type');
                return;
            }
        });
    };
}
exports.authenticatedOperationHandler = authenticatedOperationHandler;
