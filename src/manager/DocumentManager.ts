import { v4 as uuidv4 } from 'uuid';
import { rm } from 'fs/promises';
import { setTimeout } from 'timers/promises';
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
    // DO NOT AWAIT THIS
    this.initializeDirectoryCleaner();
  }

  public async createDocument(html: string): Promise<string> {
    const path = await this.createDocumentRecord();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    await page.emulateMediaType('print');
    await page.pdf({
      path,
      margin: { top: '0.25in', right: '0.25in', bottom: '0.25in', left: '0.25in' },
      printBackground: true,
      format: 'A4',
    });
    await browser.close();
    return path;
  }

  private async createDocumentRecord(): Promise<string> {
    let record: DocumentRecord = {
      documentId: uuidv4(),
      documentName: DocumentManager.DOCUMENT_DIRECTORY + '/' + uuidv4() + '.pdf',
      expirationDate: new Date().getTime() + 1000 * 60 * 60 * 24,
    };
    await DocumentTable.instance.putDocument(record);
    return record.documentName;
  }

  private async initializeDirectoryCleaner() {
    while (true) {
      try {
        let expired = await DocumentTable.instance.listExpiredDocuments();
        for (let document of expired) {
          try {
            await DocumentTable.instance.deleteDocument(document.documentId);
            await rm(document.documentName);
          } catch (_) {
            //
          }
        }
      } catch (_) {
        //
      }
      await setTimeout(1000);
    }
  }

}
