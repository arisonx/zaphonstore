import { CategoryType } from "@/@types/category";
import { CategoryGateway } from "@/gateways/CategoryGateway";
import { z } from "zod";

export const CategorySchema = z.object({
 id: z.string().optional(),
 name: z
  .string({
   invalid_type_error: "Nome da categoria inválido, use apenas letras e numeros",
  })
  .min(2, {
   message: "O nome da categoria precisa ter pelo menos 2 caracteres",
  })
  .regex(new RegExp(/^[a-zA-Z0-9 ]+$/), {
   message:
    "O nome da categoria não pode conter caracteres especiais (como letras com acento, símbolos, etc...), apenas letras e numeros",
  }),
});

export async function POST(req: Request) {
 const body: CategoryType = await req.json();

 try {
  const categoryParsed = CategorySchema.safeParse(body);

  const categoryGateway = new CategoryGateway();

  if (!categoryParsed.success) {
   return new Response("dados requeridos estão faltando ou são inválidos...", {
    status: 400,
    headers: { "Content-Type": "application/json" },
   });
  }

  const categoryExists = await categoryGateway.FindCategoryById(categoryParsed.data.id as string);

  if (!categoryExists) {
   return new Response("category not found", {
    status: 404,
    headers: { "Content-Type": "application/json" },
   });
  }

  const update = await categoryGateway.updateCategory({
   name: categoryParsed.data.name ? categoryParsed.data.name : categoryExists.name,
   id: categoryParsed.data.id as string,
  });

  if (!update) {
   return new Response("error updating category", {
    status: 500,
    headers: { "Content-Type": "application/json" },
   });
  }

  return new Response("", {
   status: 200,
   headers: { "Content-Type": "application/json" },
  });
 } catch (err) {
  return new Response("internal server error", {
   status: 500,
   headers: { "Content-Type": "application/json" },
  });
 }
}
