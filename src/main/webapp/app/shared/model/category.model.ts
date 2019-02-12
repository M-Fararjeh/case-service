import { ICategory } from 'app/shared/model/category.model';

export interface ICategory {
  id?: number;
  key?: string;
  name?: string;
  subCategories?: ICategory[];
  parentCategory?: ICategory;
}

export const defaultValue: Readonly<ICategory> = {};
