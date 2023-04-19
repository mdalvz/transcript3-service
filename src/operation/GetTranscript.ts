import {
  GetTranscriptRequest,
  GetTranscriptRequestSchema,
  GetTranscriptResponse,
} from 'transcript3-model';
import { authenticatedOperationHandler } from './Common';
import { TranscriptTable } from '../table/TranscriptTable';

export async function getTranscript(
  request: GetTranscriptRequest, 
  accountEmail: string
): Promise<GetTranscriptResponse> {

  let record = await TranscriptTable.instance.getTranscript(request.transcriptId);
  if (record.accountEmail !== accountEmail) {
    throw new Error('Transcript is owned by another account');
  }
  return record;
}

export const getTranscriptHandler = authenticatedOperationHandler(
  getTranscript, 
  GetTranscriptRequestSchema
);
