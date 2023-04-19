import { DeleteTranscriptRequest, DeleteTranscriptResponse } from 'transcript3-model';
export declare function deleteTranscript(request: DeleteTranscriptRequest, accountEmail: string): Promise<DeleteTranscriptResponse>;
export declare const deleteTranscriptHandler: (request: any, response: any) => void;
