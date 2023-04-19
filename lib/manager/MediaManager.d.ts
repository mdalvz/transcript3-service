import { BaseManager } from './BaseManager';
export declare class MediaManager extends BaseManager {
    static readonly MEDIA_DIRECTORY = "./media";
    initialize(): Promise<void>;
    initializeDirectory(path: string): Promise<void>;
}
