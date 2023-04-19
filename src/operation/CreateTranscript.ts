import { v4 as uuidv4 } from 'uuid';
import {
  CreateTranscriptRequest,
  CreateTranscriptRequestSchema,
  CreateTranscriptResponse,
  Transcript
} from 'transcript3-model';
import { authenticatedOperationHandler } from './Common';
import { TranscriptTable } from '../table/TranscriptTable';

export async function createTranscript(
  request: CreateTranscriptRequest, 
  accountEmail: string
): Promise<CreateTranscriptResponse> {

  let record: Transcript = {
    transcriptId: uuidv4(),
    accountEmail,
    schoolName: '',
    schoolAddress: '',
    adminTitle: '',
    adminName: '',
    adminPhone: '',
    adminEmail: '',
    studentNameFirst: '',
    studentNameMiddle: '',
    studentNameLast: '',
    studentNameSuffix: '',
    studentBirthDate: '',
    studentAddress: '',
    studentPhone: '',
    studentEmail: '',
    transcriptTitle: '',
    transcriptLogo: '',
    arrangeByGrade: true,
    computeWeightedGPA: true,
  };
  await TranscriptTable.instance.putTranscript(record);
  return record;
}

export const createTranscriptHandler = authenticatedOperationHandler(
  createTranscript, 
  CreateTranscriptRequestSchema
);
