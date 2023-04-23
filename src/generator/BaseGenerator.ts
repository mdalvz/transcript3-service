import { JSDOM } from 'jsdom';
import { AccountRecord } from '../record/AccountRecord';
import { TranscriptRecord } from '../record/TranscriptRecord';
import { DocumentManager } from '../manager/DocumentManager';
import { ClassRecord } from '../record/ClassRecord';

export abstract class BaseGenerator {

  private readonly jsdom: JSDOM;

  protected readonly document: Document;

  protected readonly account: AccountRecord;

  protected readonly transcript: TranscriptRecord;

  protected readonly classes: ClassRecord[];

  public constructor(
    account: AccountRecord, 
    transcript: TranscriptRecord,
    classes: ClassRecord[]) {

    this.jsdom = new JSDOM();
    this.document = this.jsdom.window.document;
    this.account = account;
    this.transcript = transcript;
    this.classes = classes;
  }

  protected abstract onGenerate(): Promise<void>;

  public async generate(): Promise<string> {
    await this.onGenerate();
    let html = this.jsdom.serialize();
    return await DocumentManager.instance.createDocument(html);
  }

}
