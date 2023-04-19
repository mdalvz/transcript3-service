import * as express from 'express';
import * as cors from 'cors';
import {
  CreateAccountResource,
  CreateSessionResource,
  CreateTranscriptResource,
  DeleteTranscriptResource,
  ListTranscriptsResource,
  UpdateTranscriptResource,
  GetTranscriptResource,
  CreateClassResource,
  DeleteClassResource,
  ListClassesResource,
  UpdateClassResource,
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
import { getTranscriptHandler } from './operation/GetTranscript';
import { createClassHandler } from './operation/CreateClass';
import { deleteClassHandler } from './operation/DeleteClass';
import { listClassesHandler } from './operation/ListClasses';
import { updateClassHandler } from './operation/UpdateClass';
import { TranscriptTable } from './table/TranscriptTable';
import { DocumentTable } from './table/DocumentTable';
import { DocumentManager } from './manager/DocumentManager';
import { MediaManager } from './manager/MediaManager';

async function main() {

  await AccountTable.instance.initialize();
  await SessionTable.instance.initialize();
  await ClassTable.instance.initialize();
  await TranscriptTable.instance.initialize();
  await DocumentTable.instance.initialize();
  await DocumentManager.instance.initialize();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/media', express.static(MediaManager.MEDIA_DIRECTORY));

  app.post(CreateAccountResource, createAccountHandler);
  app.post(CreateSessionResource, createSessionHandler);
  app.post(CreateTranscriptResource, createTranscriptHandler);
  app.post(DeleteTranscriptResource, deleteTranscriptHandler);
  app.post(ListTranscriptsResource, listTranscriptsHandler);
  app.post(UpdateTranscriptResource, updateTranscriptHandler);
  app.post(GetTranscriptResource, getTranscriptHandler);
  app.post(CreateClassResource, createClassHandler);
  app.post(DeleteClassResource, deleteClassHandler);
  app.post(UpdateClassResource, updateClassHandler);
  app.post(ListClassesResource, listClassesHandler);

  console.log('Started transcript3-service');
  app.listen(3000);

}

main();
