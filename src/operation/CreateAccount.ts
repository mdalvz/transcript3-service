import * as md5 from 'md5';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateAccountRequest,
  CreateAccountRequestSchema,
  CreateAccountResponse
} from 'transcript3-model';
import { operationHandler } from './Common';
import { AccountTable } from '../table/AccountTable';

export async function createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse> {
  let accountPasswordSalt = uuidv4();
  let accountPasswordHash = md5(request.accountPassword + accountPasswordSalt);
  await AccountTable.instance.putAccount({
    accountEmail: request.accountEmail,
    accountPasswordHash,
    accountPasswordSalt,
  });
  return {};
}

export const createAccountHandler = operationHandler(createAccount, CreateAccountRequestSchema);
