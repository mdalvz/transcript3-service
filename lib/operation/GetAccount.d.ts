import { GetAccountRequest, GetAccountResponse } from 'transcript3-model';
export declare function getAccount(_: GetAccountRequest, accountEmail: string): Promise<GetAccountResponse>;
export declare const getAccountHandler: (request: any, response: any) => void;
