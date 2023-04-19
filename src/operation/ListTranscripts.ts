import {
  ListTranscriptsRequest,
  ListTranscriptsRequestSchema,
  ListTranscriptsResponse,
} from 'transcript3-model';
import { authenticatedOperationHandler } from './Common';
import { TranscriptTable } from '../table/TranscriptTable';

export async function listTranscripts(
  _: ListTranscriptsRequest, 
  accountEmail: string
): Promise<ListTranscriptsResponse> {

  return await TranscriptTable.instance.listTranscripts(accountEmail);
}

export const listTranscriptsHandler = authenticatedOperationHandler(
  listTranscripts, 
  ListTranscriptsRequestSchema
);
