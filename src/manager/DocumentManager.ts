import { v4 as uuidv4 } from 'uuid';
import { MediaManager } from './MediaManager';
import { DocumentRecord } from '../record/DocumentRecord';
import { DocumentTable } from '../table/DocumentTable';

export class DocumentManager extends MediaManager {

  public static readonly instance = new DocumentManager();

  public static readonly DOCUMENT_DIRECTORY = `${MediaManager.MEDIA_DIRECTORY}/documents`;

  public async initialize() {
    await super.initialize();
    await this.initializeDirectory(DocumentManager.DOCUMENT_DIRECTORY);
  }

  public async createDocument(): Promise<string> {
    let record: DocumentRecord = {
      documentId: uuidv4(),
      documentName: uuidv4() + '.pdf',
      expirationDate: new Date().getTime() + 1000 * 60 * 60 * 24,
    };
    await DocumentTable.instance.putDocument(record);
    return DocumentManager.DOCUMENT_DIRECTORY + '/' + record.documentName;
  }

}
