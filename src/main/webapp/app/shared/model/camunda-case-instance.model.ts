import { ICazeInstance } from 'app/shared/model/caze-instance.model';

export interface ICamundaCaseInstance {
  id?: number;
  caseInstanceId?: string;
  caseInstanceName?: string;
  cazeInstances?: ICazeInstance[];
}

export const defaultValue: Readonly<ICamundaCaseInstance> = {};
