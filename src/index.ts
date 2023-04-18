import * as express from 'express';
import * as cors from 'cors';
import {
  CreateAccountResource,
  CreateSessionResource
} from 'transcript3-model';
import { createSessionHandler } from './operation/CreateSession';
import { createAccountHandler } from './operation/CreateAccount';
import { AccountTable } from './table/AccountTable';
import { SessionTable } from './table/SessionTable';
import { ClassTable } from './table/ClassTable';

async function main() {

  await AccountTable.instance.initialize();
  await SessionTable.instance.initialize();
  await ClassTable.instance.initialize();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post(CreateAccountResource, createAccountHandler);
  app.post(CreateSessionResource, createSessionHandler);

  app.listen(3000);

}

main();
