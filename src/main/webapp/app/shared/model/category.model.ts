import { ICategory } from 'app/shared/model/category.model';

export interface ICategory {
  id?: number;
  key?: string;
  name?: string;
  categories?: ICategory[];
  category?: ICategory;
}

export const defaultValue: Readonly<ICategory> = {};
