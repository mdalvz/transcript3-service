import {
  CreateAccountRequest,
  CreateAccountRequestSchema,
  CreateAccountResponse
} from 'transcript3-model';
import { operationHandler } from './Common';

export async function createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse> {
  return {};
}

export const createAccountHandler = operationHandler(createAccount, CreateAccountRequestSchema);
