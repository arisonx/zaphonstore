"use server";

import { CategoryType } from "@/@types/category";
import { CategorySchema } from "@/@types/schemas/addCategorySchema";
import { revalidatePath, revalidateTag } from "next/cache";

export type CreateCategoryResponse = {
 sucess: boolean;
 error: {
  message: string | null;
 };
};

export async function createCategory(formData: CategoryType): Promise<CreateCategoryResponse> {
 try {
  const categoryParsed = CategorySchema.safeParse(formData);

  if (!categoryParsed.success) {
   return {
    sucess: false,
    error: {
     message: categoryParsed.error.message,
    },
   };
  }

  await fetch("http://localhost:3000/api/category/create", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(categoryParsed.data),
  });
  revalidatePath("/", "page");
  revalidateTag("get-categories");

  return {
   error: {
    message: null,
   },
   sucess: true,
  };
 } catch (e) {
  return {
   error: {
    message: "Ocorreu um erro ao tentar salvar a categoria. Tente novamente em alguns minutos!",
   },
   sucess: false,
  };
 }
}
