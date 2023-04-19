import {
  DeleteTranscriptRequest,
  DeleteTranscriptRequestSchema,
  DeleteTranscriptResponse,
} from 'transcript3-model';
import { authenticatedOperationHandler } from './Common';
import { TranscriptTable } from '../table/TranscriptTable';

export async function deleteTranscript(
  request: DeleteTranscriptRequest, 
  accountEmail: string
): Promise<DeleteTranscriptResponse> {

  let record = await TranscriptTable.instance.getTranscript(request.transcriptId);
  if (record.accountEmail !== accountEmail) {
    throw new Error('Transcript is owned by another account');
  }
  await TranscriptTable.instance.deleteTranscript(record.transcriptId);
  return {};
}

export const deleteTranscriptHandler = authenticatedOperationHandler(
  deleteTranscript, 
  DeleteTranscriptRequestSchema
);
