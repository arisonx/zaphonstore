import { z } from "zod";
import { productSchema } from "./addProductSchema";
export const StockSchema = z.object({
 id: z.string().optional(),
 content: z.string(),
 products: z.array(productSchema),
});
