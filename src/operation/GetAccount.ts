import {
  GetAccountRequest,
  GetAccountRequestSchema,
  GetAccountResponse,
} from 'transcript3-model';
import { authenticatedOperationHandler } from './Common';
import { AccountTable } from '../table/AccountTable';

export async function getAccount(
  _: GetAccountRequest, 
  accountEmail: string
): Promise<GetAccountResponse> {

  let record = await AccountTable.instance.getAccount(accountEmail);
  return {
    accountEmail,
    accountActivated: record.accountActivated == 1,
  };
}

export const getAccountHandler = authenticatedOperationHandler(
  getAccount, 
  GetAccountRequestSchema
);
