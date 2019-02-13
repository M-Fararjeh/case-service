import { Moment } from 'moment';
import { ICaseDataObject } from 'app/shared/model/case-data-object.model';
import { ICazeType } from 'app/shared/model/caze-type.model';
import { ICamundaCaseInstance } from 'app/shared/model/camunda-case-instance.model';
import { ICamundaProcessInstance } from 'app/shared/model/camunda-process-instance.model';
import { ICazeInstance } from 'app/shared/model/caze-instance.model';

export const enum CasePriority {
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
  LOW = 'LOW'
}

export interface ICazeInstance {
  id?: number;
  name?: string;
  description?: string;
  number?: string;
  creatorId?: string;
  issuerID?: string;
  creationDate?: Moment;
  caseDate?: Moment;
  priority?: CasePriority;
  requiredTime?: number;
  secured?: boolean;
  cmmnId?: string;
  caseDataObjects?: ICaseDataObject[];
  cazeType?: ICazeType;
  camundaCaseInstances?: ICamundaCaseInstance[];
  camundaProcessInstances?: ICamundaProcessInstance[];
  relatedCazes?: ICazeInstance[];
}

export const defaultValue: Readonly<ICazeInstance> = {
  secured: false
};
