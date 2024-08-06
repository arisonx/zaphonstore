"use server";
import { ProductsGateway } from "@/gateways/productGateway";
import { RefreshProductAction } from "./refreshProducts";

interface IRemoveProduct {
 refresh?: boolean;
 path?: string;
 id: string;
}

export async function RemoveProduct({ id, path, refresh }: IRemoveProduct) {
 try {
  const productGateway = new ProductsGateway();

  const productExists = await productGateway.GetUnicProductById(id);

  if (!productExists?.id) {
   return null;
  }

  await productGateway.DeleteProduct(id);

  refresh === true ? RefreshProductAction({ path: path }) : false;

  return true;
 } catch (err) {
  console.log(err);
  return null;
 }
}
