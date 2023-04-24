import { Class } from 'transcript3-model';

export type ClassRecord = Class;

export type ClassRecordInternal = Omit<ClassRecord, 'type'> & { type: string };
