import { GetTranscriptRequest, GetTranscriptResponse } from 'transcript3-model';
export declare function getTranscript(request: GetTranscriptRequest, accountEmail: string): Promise<GetTranscriptResponse>;
export declare const getTranscriptHandler: (request: any, response: any) => void;
