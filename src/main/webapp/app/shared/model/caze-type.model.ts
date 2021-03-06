import { ICategory } from 'app/shared/model/category.model';

export const enum CasePriority {
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
  LOW = 'LOW'
}

export interface ICazeType {
  id?: number;
  name?: string;
  priority?: CasePriority;
  requiredTime?: number;
  secured?: boolean;
  category?: ICategory;
}

export const defaultValue: Readonly<ICazeType> = {
  secured: false
};
