import { DocumentRecord } from '../record/DocumentRecord';
import { BaseTable } from './BaseTable';

export class DocumentTable extends BaseTable {

  public static readonly instance = new DocumentTable();

  private readonly TABLE_NAME = 'documents';

  private readonly DOCUMENT_ID      = 'documentId';
  private readonly DOCUMENT_NAME    = 'documentName';
  private readonly EXPIRATION_DATE  = 'expirationDate';

  public constructor() {
    super();
  }

  public async initialize(): Promise<void> {
    if (!await this.connection.schema.hasTable(this.TABLE_NAME)) {
      await this.connection.schema.createTable(this.TABLE_NAME, (table) => {
        table.text(this.DOCUMENT_ID).primary();
        table.text(this.DOCUMENT_NAME);
        table.bigInteger(this.EXPIRATION_DATE);
      });
    }
  }

  public async putDocument(record: DocumentRecord) {
    await this.connection<DocumentRecord>(this.TABLE_NAME)
      .insert(record);
  }

  public async listExpiredDocuments(): Promise<DocumentRecord[]> {
    return await this.connection<DocumentRecord>(this.TABLE_NAME)
      .select('*')
      .where(this.EXPIRATION_DATE, '<', new Date().getTime());
  }

  public async deleteDocument(documentId: string) {
    await this.connection<DocumentRecord>(this.TABLE_NAME)
      .delete()
      .where(this.DOCUMENT_ID, documentId);
  }

}
