import { ProductType } from "@/@types/products";
import { ProductsGateway } from "@/gateways/productGateway";

export async function POST(req: Request) {
 const body: ProductType = await req.json();

 const productGateway = new ProductsGateway();

 try {
  const productExists = await productGateway.GetUnicProductById(body.id as string);

  if (!productExists) {
   return new Response("Product Not Found", {
    status: 404,
    headers: { "Content-Type": "application/json" },
   });
  }

  const updateProduct = await productGateway.UpdateProduct({
    id: body.id,
   name: body.name ? body.name : (productExists.name as string),
   category_id: body.category_id ? body.category_id : (productExists.category_id as string),
   discount: body.discount ? body.discount : (productExists.discount as number),
   image_key: body.image_key ? body.image_key : (productExists.image_key as string),
   image_url: body.image_url ? body.image_url : (productExists.image_url as string),
   price_cents: body.price_cents ? body.price_cents : (productExists.price_cents as number),
   price_reals: body.price_reals ? body.price_reals : (productExists.price_reals as number),
   stock_count: body.stock_count ? body.stock_count : (productExists.stock_count as number),
   sold_off: body.sold_off ? body.sold_off : (productExists.sold_off as boolean),
  });

  if (!updateProduct) {
   return new Response("Internal Server Error", {
    status: 500,
    headers: { "Content-Type": "application/json" },
   });
  }

  return new Response("Product Updated Successfully", {
   status: 200,
   headers: { "Content-Type": "application/json" },
  });
 } catch (err) {
  return new Response("Internal Server Error", {
   status: 500,
   headers: { "Content-Type": "application/json" },
  });
 }
}
