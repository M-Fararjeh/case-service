import { IApiHeader } from 'app/shared/model/api-header.model';
import { ICaseDataObject } from 'app/shared/model/case-data-object.model';

export const enum ApiMethod {
  GET = 'GET',
  POST = 'POST'
}

export interface IApiDataObject {
  id?: number;
  method?: ApiMethod;
  url?: string;
  body?: string;
  apiHeaders?: IApiHeader[];
  caseDataObject?: ICaseDataObject;
}

export const defaultValue: Readonly<IApiDataObject> = {};
