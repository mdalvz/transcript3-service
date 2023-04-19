import { z } from 'zod';
export declare function operationHandler<TRequest, TResponse>(fn: (request: TRequest) => Promise<TResponse>, requestSchema: z.ZodType<TRequest>): (request: any, response: any) => void;
export declare function authenticatedOperationHandler<TRequest extends {
    sessionToken: string;
}, TResponse>(fn: (request: TRequest, accountEmail: string) => Promise<TResponse>, requestSchema: z.ZodType<TRequest>): (request: any, response: any) => void;
