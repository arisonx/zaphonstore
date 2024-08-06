import { z } from "zod";

export const productSchema = z.object({
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
 price_reals: z.string().transform(v => Number(v) || 0),
 price_cents: z.string().transform(v => Number(v) || 0),
 discount: z.string().transform(v => Number(v) || 0),
 stock: z.string().transform(v => Number(v) || 0),
 sold_off: z.boolean(),
 file: z.instanceof(File).refine(file => /\.(webp|png|jpe?g)$/i.test(file.name), {
  message: "O arquivo deve ser uma imagem com as extensões .webp, .png, .jpg, jpeg",
 }),
});
