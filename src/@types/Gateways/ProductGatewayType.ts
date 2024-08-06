import { ProductType } from "@/@types/products";

export interface IActionsTipeProductComponent {
 GetAllProducts: () => Promise<ProductType[] | any>;
 GetUnicProductById: (id: string) => Promise<ProductType | any>;
}
