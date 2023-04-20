import {
  GenerateTranscriptRequest,
  GenerateTranscriptRequestSchema,
  GenerateTranscriptResponse,
} from 'transcript3-model';
import { authenticatedOperationHandler } from './Common';
import { TranscriptTable } from '../table/TranscriptTable';
import { DefaultGenerator } from '../generator/DefaultGenerator';
import { AccountTable } from '../table/AccountTable';

export async function generateTranscript(
  request: GenerateTranscriptRequest, 
  accountEmail: string
): Promise<GenerateTranscriptResponse> {

  let transcript = await TranscriptTable.instance.getTranscript(request.transcriptId);
  if (transcript.accountEmail !== accountEmail) {
    throw new Error('Transcript is owned by another account');
  }
  let account = await AccountTable.instance.getAccount(accountEmail);
  let generator = new DefaultGenerator(account, transcript);
  let documentName = await generator.generate();
  return {
    // Kind of a hack to remove the '.'
    documentName: documentName.substring(1),
  };
}

export const generateTranscriptHandler = authenticatedOperationHandler(
  generateTranscript, 
  GenerateTranscriptRequestSchema
);
