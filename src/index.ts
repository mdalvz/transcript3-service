import * as express from 'express';
import * as cors from 'cors';
import {
  CreateAccountResource,
  CreateSessionResource,
  CreateTranscriptResource,
  DeleteTranscriptResource,
  ListTranscriptsResource,
  UpdateTranscriptResource,
} from 'transcript3-model';
import { AccountTable } from './table/AccountTable';
import { SessionTable } from './table/SessionTable';
import { ClassTable } from './table/ClassTable';
import { createSessionHandler } from './operation/CreateSession';
import { createAccountHandler } from './operation/CreateAccount';
import { createTranscriptHandler } from './operation/CreateTranscript';
import { deleteTranscriptHandler } from './operation/DeleteTranscript';
import { listTranscriptsHandler } from './operation/ListTranscripts';
import { updateTranscriptHandler } from './operation/UpdateTranscript';
import { TranscriptTable } from './table/TranscriptTable';

async function main() {

  await AccountTable.instance.initialize();
  await SessionTable.instance.initialize();
  await ClassTable.instance.initialize();
  await TranscriptTable.instance.initialize();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post(CreateAccountResource, createAccountHandler);
  app.post(CreateSessionResource, createSessionHandler);
  app.post(CreateTranscriptResource, createTranscriptHandler);
  app.post(DeleteTranscriptResource, deleteTranscriptHandler);
  app.post(ListTranscriptsResource, listTranscriptsHandler);
  app.post(UpdateTranscriptResource, updateTranscriptHandler);

  app.listen(3000);

}

main();
