import { IApiDataObject } from 'app/shared/model/api-data-object.model';

export interface IApiHeader {
  id?: number;
  key?: string;
  value?: string;
  apiDataObject?: IApiDataObject;
}

export const defaultValue: Readonly<IApiHeader> = {};
