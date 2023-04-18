import * as md5 from 'md5';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateSessionRequest,
  CreateSessionRequestSchema,
  CreateSessionResponse
} from 'transcript3-model';
import { operationHandler } from './Common';
import { AccountTable } from '../table/AccountTable';
import { SessionTable } from '../table/SessionTable';

function getSessionExpirationDate(): number {
  return new Date().getTime() + 1000 * 60 * 60 * 24;
}

export async function createSession(request: CreateSessionRequest): Promise<CreateSessionResponse> {
  let record = await AccountTable.instance.getAccount(request.accountEmail);
  let calculatedHash = md5(request.accountPassword + record.accountPasswordSalt);
  if (calculatedHash !== record.accountPasswordHash) {
    throw new Error('Incorrect password');
  }
  let sessionToken = uuidv4();
  await SessionTable.instance.putSession({
    sessionToken,
    accountEmail: record.accountEmail,
    expirationDate: getSessionExpirationDate(),
  });
  return {
    sessionToken,
  };
}

export const createSessionHandler = operationHandler(createSession, CreateSessionRequestSchema);
