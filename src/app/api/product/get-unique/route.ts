import { ProductsGateway } from "@/gateways/productGateway";

export async function POST(req: Request) {
 const product_id = await req.json();

 if (!product_id) {
  return new Response("required params not sent", {
   status: 400,
  });
 }

 const productGateway = new ProductsGateway();

 try {
  const productExists = await productGateway.GetUnicProductById(product_id);
  if (!productExists) {
   return new Response("Product not found", {
    status: 404,
   });
  }

  return productExists;
 } catch (err) {
  return new Response("Internal Server Error", {
   status: 500,
  });
 }
}
