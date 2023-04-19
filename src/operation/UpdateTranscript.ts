import {
  UpdateTranscriptRequest,
  UpdateTranscriptRequestSchema,
  UpdateTranscriptResponse,
} from 'transcript3-model';
import { authenticatedOperationHandler } from './Common';
import { TranscriptTable } from '../table/TranscriptTable';

export async function updateTranscript(
  request: UpdateTranscriptRequest, 
  accountEmail: string
): Promise<UpdateTranscriptResponse> {

  let record = await TranscriptTable.instance.getTranscript(request.transcript.transcriptId);
  if (record.accountEmail !== accountEmail) {
    throw new Error('Transcript is owned by another account');
  }
  let result = {  ...request.transcript, accountEmail };
  await TranscriptTable.instance.updateTranscript(result);
  return result;
}

export const updateTranscriptHandler = authenticatedOperationHandler(
  updateTranscript, 
  UpdateTranscriptRequestSchema
);
