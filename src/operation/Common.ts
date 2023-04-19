import { z } from 'zod';
import { SessionTable } from '../table/SessionTable';

export function operationHandler<TRequest, TResponse>(
  fn: (request: TRequest) => Promise<TResponse>,
  requestSchema: z.ZodType<TRequest>
): (request: any, response: any) => void {
  return async function(request: any, response: any) {
    try {
      let requestBody = requestSchema.parse(request.body);
      try {
        let responseBody = await fn(requestBody);
        response.status(200);
        response.json(responseBody);
        return;
      } catch (error) {
        if (error instanceof Error) {
          response.status(400);
          response.send(error.message);
          return;
        } else {
          response.status(500);
          response.send('Internal server error');
          return;
        }
      }
    } catch (_) {
      response.status(400);
      response.send('Invalid request type');
      return;
    }
  }
}

export function authenticatedOperationHandler<TRequest extends { sessionToken: string }, TResponse>(
  fn: (request: TRequest, accountEmail: string) => Promise<TResponse>,
  requestSchema: z.ZodType<TRequest>
): (request: any, response: any) => void {
  return async function(request: any, response: any) {
    try {
      let requestBody = requestSchema.parse(request.body);
      try {
        let { accountEmail } = await SessionTable.instance.getSession(requestBody.sessionToken);
        try {
          let responseBody = await fn(requestBody, accountEmail);
          response.status(200);
          response.json(responseBody);
          return;
        } catch (error) {
          if (error instanceof Error) {
            response.status(400);
            response.send(error.message);
            return;
          } else {
            response.status(500);
            response.send('Internal server error');
            return;
          }
        }
      } catch (_) {
        response.status(403);
        response.send('Invalid session token');
        return;
      }
    } catch (_) {
      response.status(400);
      response.send('Invalid request type');
      return;
    }
  }
}
