import { DocumentRecord } from '../record/DocumentRecord';
import { BaseTable } from './BaseTable';
export declare class DocumentTable extends BaseTable {
    static readonly instance: DocumentTable;
    private readonly TABLE_NAME;
    private readonly DOCUMENT_ID;
    private readonly DOCUMENT_NAME;
    private readonly EXPIRATION_DATE;
    constructor();
    initialize(): Promise<void>;
    putDocument(record: DocumentRecord): Promise<void>;
    listExpiredDocuments(): Promise<DocumentRecord[]>;
    deleteDocument(documentId: string): Promise<void>;
}
