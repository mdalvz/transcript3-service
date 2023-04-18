import * as express from 'express';
import * as cors from 'cors';
import {
  CreateAccountResource,
  CreateSessionResource
} from 'transcript3-model';
import { createSessionHandler } from './operation/CreateSession';
import { createAccountHandler } from './operation/CreateAccount';

const app = express();
app.use(cors());
app.use(express.json());

app.post(CreateAccountResource, createAccountHandler);
app.post(CreateSessionResource, createSessionHandler);

app.listen(3000);
