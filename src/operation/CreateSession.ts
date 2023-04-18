import {
  CreateSessionRequest,
  CreateSessionRequestSchema,
  CreateSessionResponse
} from 'transcript3-model';
import { operationHandler } from './Common';

export async function createSession(request: CreateSessionRequest): Promise<CreateSessionResponse> {
  return { sessionToken: 'abcdefg' };
}

export const createSessionHandler = operationHandler(createSession, CreateSessionRequestSchema);
