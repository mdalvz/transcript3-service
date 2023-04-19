import { v4 as uuidv4 } from 'uuid';
import {
  CreateClassRequest,
  CreateClassRequestSchema,
  CreateClassResponse,
  Class,
} from 'transcript3-model';
import { authenticatedOperationHandler } from './Common';
import { TranscriptTable } from '../table/TranscriptTable';
import { ClassTable } from '../table/ClassTable';

export async function createClass(
  request: CreateClassRequest, 
  accountEmail: string
): Promise<CreateClassResponse> {

  let transcript = await TranscriptTable.instance.getTranscript(request.transcriptId);
  if (transcript.accountEmail !== accountEmail) {
    throw new Error('Transcript is owned by another account');
  }
  let record: Class = {
    classId: uuidv4(),
    transcriptId: transcript.transcriptId,
    type: '',
    name: '',
    year: '',
    term: '',
    subject: '',
    level: -1,
    provider: '',
    grade: '',
    awarded: 0,
    attempted: 0,
  };
  await ClassTable.instance.putClass(record);
  return record;
}

export const createClassHandler = authenticatedOperationHandler(
  createClass, 
  CreateClassRequestSchema
);
