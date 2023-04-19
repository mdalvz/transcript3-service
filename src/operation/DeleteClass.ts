import {
  DeleteClassRequest,
  DeleteClassRequestSchema,
  DeleteClassResponse,
} from 'transcript3-model';
import { authenticatedOperationHandler } from './Common';
import { TranscriptTable } from '../table/TranscriptTable';
import { ClassTable } from '../table/ClassTable';

export async function deleteClass(
  request: DeleteClassRequest, 
  accountEmail: string
): Promise<DeleteClassResponse> {

  let record = await ClassTable.instance.getClass(request.classId);
  let transcript = await TranscriptTable.instance.getTranscript(record.transcriptId);
  if (transcript.accountEmail !== accountEmail) {
    throw new Error('Transcript is owned by another account');
  }
  await ClassTable.instance.deleteClass(request.classId);
  return {};
}

export const deleteClassHandler = authenticatedOperationHandler(
  deleteClass, 
  DeleteClassRequestSchema
);
