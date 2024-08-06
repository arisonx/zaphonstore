import { ProductType } from "./products";

export type CategoryType = {
 id?: string;
 name: string;
 products?: ProductType[];
};
