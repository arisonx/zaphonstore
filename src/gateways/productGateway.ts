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

 public async CreateProduct(productData: ProductType) {
  try {
   const productExists = await prismaclient.products.findFirst({
    where: {
     name: productData.name,
    },
   });

   if (productExists) {
    return null;
   }

   const product = await prismaclient.products.create({
    data: {
     image_url: productData.image_url as string,
     name: productData.name as string,
     stock: productData.stock as number,
     price_reals: productData.price_reals as number,
     price_cents: productData.price_cents as number,
     discount: productData.discount as number,
     sold_off: productData.sold_off as boolean,
     category_id: productData.category_id as string,
     image_key: productData.image_key as string,
    },
   });

   return product;
  } catch (errr) {
   return null;
  }
 }

 public async DeleteProduct(productId: string) {
  try {
   await prismaclient.products.delete({
    where: {
     id: productId,
    },
   });
   return true;
  } catch (err) {
   return null;
  }
 }

 public async GetUnicProductById(id: string) {
  try {
   const product: ProductType = await prismaclient.products.findUniqueOrThrow({
    where: {
     id: id,
    },
   });
   return product;
  } catch (err) {
   return null;
  }
 }

 public async UpdateProduct(product: ProductType) {
  try {
   await prismaclient.products.update({
    where: {
     id: product.id,
    },
    data: {
     name: product.name,
     stock: product.stock as number,
     price_reals: product.price_reals as number,
     price_cents: product.price_cents as number,
     discount: product.discount,
     sold_off: product.sold_off,
     category_id: product.category_id,
     image_url: product.image_url as string,
     image_key: product.image_key as string,
    },
   });
   return true;
  } catch (err) {
   return null;
  }
 }
}
