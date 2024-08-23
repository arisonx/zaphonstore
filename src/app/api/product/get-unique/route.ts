import { ProductsGateway } from "@/gateways/productGateway";

export async function POST(req: Request) {
 const body: { product_id: string } = await req.json();

 if (!body.product_id) {
  return new Response("required params not sent", {
   status: 400,
  });
 }

 const productGateway = new ProductsGateway();

 try {
  const productExists = await productGateway.GetUnicProductById(body.product_id);

  if (!productExists) {
   return new Response("Product not found", {
    status: 404,
   });
  }

  return new Response(JSON.stringify(productExists), {
   headers: {
    "Content-Type": "application/json",
   },
   status: 200,
  });
 } catch (err) {
  return new Response("Internal Server Error", {
   status: 500,
  });
 }
}
