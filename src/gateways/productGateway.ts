import { prismaclient } from "@/lib/prisma/prismaclient";
import { IActionsTipeProductComponent } from "../@types/Gateways/ProductGatewayType";
import { ProductType } from "@/@types/products";

export class ProductsGateway implements IActionsTipeProductComponent {
  public async GetAllProducts() {
    try {
      const products = await prismaclient.products.findMany();
      return products;
    } catch (err) {
      return null;
    }
  }

  public async GetUnicProductById(id: string) {
    try {
      const product: ProductType =
        await prismaclient.products.findUniqueOrThrow({
          where: {
            id: id,
          },
        });
      return product;
    } catch (err) {
      return null;
    }
  }
}
