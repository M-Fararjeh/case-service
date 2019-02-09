import { ICaseDataObject } from 'app/shared/model/case-data-object.model';

export interface IDbDataObject {
  id?: number;
  tableName?: string;
  columnName?: string;
  columnValue?: string;
  caseDataObject?: ICaseDataObject;
}

export const defaultValue: Readonly<IDbDataObject> = {};
