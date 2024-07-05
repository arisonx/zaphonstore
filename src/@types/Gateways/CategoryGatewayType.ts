import { CategoryType } from "../category";
import { ProductType } from "../products";
export interface CategoryGatewayType {
  getAllCategories: () => Promise<CategoryType | any>;
}
