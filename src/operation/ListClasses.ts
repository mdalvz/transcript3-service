import {
  ListClassesRequest,
  ListClassesRequestSchema,
  ListClassesResponse,
} from 'transcript3-model';
import { authenticatedOperationHandler } from './Common';
import { TranscriptTable } from '../table/TranscriptTable';
import { ClassTable } from '../table/ClassTable';

export async function listClasses(
  request: ListClassesRequest, 
  accountEmail: string
): Promise<ListClassesResponse> {

  let transcript = await TranscriptTable.instance.getTranscript(request.transcriptId);
  if (transcript.accountEmail !== accountEmail) {
    throw new Error('Transcript is owned by another account');
  }
  return await ClassTable.instance.listClasses(request.transcriptId);
}

export const listClassesHandler = authenticatedOperationHandler(
  listClasses, 
  ListClassesRequestSchema
);
