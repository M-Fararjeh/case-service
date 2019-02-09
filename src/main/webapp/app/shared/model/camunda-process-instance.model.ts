import { ICazeInstance } from 'app/shared/model/caze-instance.model';

export interface ICamundaProcessInstance {
  id?: number;
  processInstanceId?: string;
  processInstanceName?: string;
  cazeInstances?: ICazeInstance[];
}

export const defaultValue: Readonly<ICamundaProcessInstance> = {};
