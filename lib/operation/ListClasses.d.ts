import { ListClassesRequest, ListClassesResponse } from 'transcript3-model';
export declare function listClasses(request: ListClassesRequest, accountEmail: string): Promise<ListClassesResponse>;
export declare const listClassesHandler: (request: any, response: any) => void;
