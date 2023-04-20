import { GenerateTranscriptRequest, GenerateTranscriptResponse } from 'transcript3-model';
export declare function generateTranscript(request: GenerateTranscriptRequest, accountEmail: string): Promise<GenerateTranscriptResponse>;
export declare const generateTranscriptHandler: (request: any, response: any) => void;
