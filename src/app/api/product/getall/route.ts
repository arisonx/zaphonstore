import { ProductType } from "@/@types/products";
import { ProductsGateway } from "@/gateways/productGateway";

export async function GET() {
 const productGateway = new ProductsGateway();

 try {
  const products: ProductType[] | undefined = (await productGateway.GetAllProducts()) as
   | ProductType[]
   | undefined;

  return new Response(JSON.stringify(products), {
   status: 200,
  });
 } catch (err) {
  return (
   new Response(JSON.stringify({ error: "internal server error" })),
   {
    status: 500,
   }
  );
 }
}
