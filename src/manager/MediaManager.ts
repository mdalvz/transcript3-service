import { access, mkdir } from 'fs/promises';
import { BaseManager } from './BaseManager';

export class MediaManager extends BaseManager {

  public static readonly MEDIA_DIRECTORY = './media';

  public async initialize() {
    await this.initializeDirectory(MediaManager.MEDIA_DIRECTORY);
  }

  public async initializeDirectory(path: string) {
    try {
      await access(path);
    } catch (_) {
      await mkdir(path);
    }
  }

}
