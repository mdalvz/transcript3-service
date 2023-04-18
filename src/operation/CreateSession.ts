import * as md5 from 'md5';
import {
  CreateSessionRequest,
  CreateSessionRequestSchema,
  CreateSessionResponse
} from 'transcript3-model';
import { operationHandler } from './Common';
import { AccountTable } from '../table/AccountTable';

export async function createSession(request: CreateSessionRequest): Promise<CreateSessionResponse> {
  let record = await AccountTable.instance.getAccount(request.accountEmail);
  let calculatedHash = md5(request.accountPassword + record.accountPasswordSalt);
  if (calculatedHash !== record.accountPasswordHash) {
    throw new Error('Incorrect password');
  }
  return {
    sessionToken: 'yay',
  };
}

export const createSessionHandler = operationHandler(createSession, CreateSessionRequestSchema);
