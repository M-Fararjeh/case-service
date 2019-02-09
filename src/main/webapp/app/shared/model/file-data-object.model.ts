import { ICaseDataObject } from 'app/shared/model/case-data-object.model';

export interface IFileDataObject {
  id?: number;
  cmisId?: string;
  path?: string;
  caseDataObject?: ICaseDataObject;
}

export const defaultValue: Readonly<IFileDataObject> = {};
