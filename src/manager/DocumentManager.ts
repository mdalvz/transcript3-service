import { v4 as uuidv4 } from 'uuid';
import * as puppeteer from 'puppeteer';
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

  public async createDocument(html: string): Promise<string> {
    const path = await this.createDocumentRecord();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.emulateMediaType('print');
    await page.pdf({
      path,
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });
    await browser.close();
    return path;
  }

  private async createDocumentRecord(): Promise<string> {
    let record: DocumentRecord = {
      documentId: uuidv4(),
      documentName: uuidv4() + '.pdf',
      expirationDate: new Date().getTime() + 1000 * 60 * 60 * 24,
    };
    await DocumentTable.instance.putDocument(record);
    return DocumentManager.DOCUMENT_DIRECTORY + '/' + record.documentName;
  }

}
