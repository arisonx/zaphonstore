import { CategoryType } from "../category";
export interface CategoryGatewayType {
 getAllCategories: () => Promise<CategoryType | any>;
}
