import {
  UpdateClassRequest,
  UpdateClassRequestSchema,
  UpdateClassResponse,
} from 'transcript3-model';
import { authenticatedOperationHandler } from './Common';
import { TranscriptTable } from '../table/TranscriptTable';
import { ClassTable } from '../table/ClassTable';

export async function updateClass(
  request: UpdateClassRequest, 
  accountEmail: string
): Promise<UpdateClassResponse> {

  let record = await ClassTable.instance.getClass(request.class.classId);
  let transcript = await TranscriptTable.instance.getTranscript(record.transcriptId);
  if (transcript.accountEmail !== accountEmail) {
    throw new Error('Transcript is owned by another account');
  }
  let result = {
    ...request.class,
    transcriptId: transcript.transcriptId,
  };
  await ClassTable.instance.updateClass(result);
  return result;
}

export const updateClassHandler = authenticatedOperationHandler(
  updateClass, 
  UpdateClassRequestSchema
);
