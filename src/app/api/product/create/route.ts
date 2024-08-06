import { ProductsGateway } from "@/gateways/productGateway";
import { z } from "zod";

export async function POST(request: Request) {
 const ProductSchema = z.object({
  category_id: z.string({
   required_error: "por favor selecione a categoria",
  }),
  name: z
   .string({
    required_error: "Nome do produto obrigatório",
    message: "Por favor, insira o nome do produto.",
   })
   .min(1, {
    message: "Insira um nome maior para o produto",
   }),
  price_reals: z.number(),
  price_cents: z.number(),
  discount: z.number(),
  stock: z.number(),
  sold_off: z.boolean(),
  image_key: z.string(),
  image_url: z.string(),
 });

 const requestBody = await request.json();

 const productsgatway = new ProductsGateway();

 try {
  const product = ProductSchema.parse(requestBody);

  productsgatway.CreateProduct(product);

  return new Response("", {
   status: 200,
  });
 } catch (err) {
  return new Response("Internal server error", { status: 500 });
 }
}
