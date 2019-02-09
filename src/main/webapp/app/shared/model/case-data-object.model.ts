import { IApiDataObject } from 'app/shared/model/api-data-object.model';
import { IDbDataObject } from 'app/shared/model/db-data-object.model';
import { IFileDataObject } from 'app/shared/model/file-data-object.model';
import { ICazeInstance } from 'app/shared/model/caze-instance.model';

export const enum DataObjectType {
  API = 'API',
  DB = 'DB',
  FILE = 'FILE'
}

export interface ICaseDataObject {
  id?: number;
  type?: DataObjectType;
  key?: string;
  apiDataObject?: IApiDataObject;
  dbDataObject?: IDbDataObject;
  fileDataObject?: IFileDataObject;
  caseId?: ICazeInstance;
}

export const defaultValue: Readonly<ICaseDataObject> = {};
