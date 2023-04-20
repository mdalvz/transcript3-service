import { AccountRecord } from '../record/AccountRecord';
import { TranscriptRecord } from '../record/TranscriptRecord';
import { BaseGenerator } from './BaseGenerator';

export class DefaultGenerator extends BaseGenerator {

  public constructor(account: AccountRecord, transcript: TranscriptRecord) {
    super(account, transcript);
  }

  public async onGenerate() {
    let x = this.document.createElement('div');
    x.innerHTML = 'hello world!';
    this.document.body.appendChild(x);
  }

}
