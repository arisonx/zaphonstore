import { z } from "zod";
import { productSchema } from "./addProductSchema";

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
 products: z.array(productSchema).optional(),
});
