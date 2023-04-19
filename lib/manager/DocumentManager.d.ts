import { MediaManager } from './MediaManager';
export declare class DocumentManager extends MediaManager {
    static readonly instance: DocumentManager;
    static readonly DOCUMENT_DIRECTORY: string;
    initialize(): Promise<void>;
    createDocument(): Promise<string>;
}
