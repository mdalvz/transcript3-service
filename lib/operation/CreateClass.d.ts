import { CreateClassRequest, CreateClassResponse } from 'transcript3-model';
export declare function createClass(request: CreateClassRequest, accountEmail: string): Promise<CreateClassResponse>;
export declare const createClassHandler: (request: any, response: any) => void;
