import { CreateTranscriptRequest, CreateTranscriptResponse } from 'transcript3-model';
export declare function createTranscript(_: CreateTranscriptRequest, accountEmail: string): Promise<CreateTranscriptResponse>;
export declare const createTranscriptHandler: (request: any, response: any) => void;
