import { DeleteClassRequest, DeleteClassResponse } from 'transcript3-model';
export declare function deleteClass(request: DeleteClassRequest, accountEmail: string): Promise<DeleteClassResponse>;
export declare const deleteClassHandler: (request: any, response: any) => void;
