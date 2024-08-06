"use server";
import { CategorySchema } from "@/@types/schemas/addCategorySchema";
import { CategoryType } from "@/@types/category";

export type updateCategoryResponse = {
 sucess: boolean;
 error: {
  message: string | null;
 };
};

export async function EditCategory(categoryData: CategoryType): Promise<updateCategoryResponse> {
 try {
  const categoryParsed = CategorySchema.safeParse(categoryData);

  if (!categoryParsed.success) {
   return {
    sucess: false,
    error: {
     message: categoryParsed.error.message,
    },
   };
  }

  const updateCategory = await fetch("http://localhost:3000/api/category/update", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(categoryParsed.data),
  });

  if (updateCategory.status !== 200) {
   const body = await updateCategory.json();
   return {
    sucess: false,
    error: {
     message: body?.name,
    },
   };
  }
  return {
   sucess: true,
   error: {
    message: null,
   },
  };
 } catch (err) {
  return {
   sucess: false,
   error: {
    message: "Ocorreu um erro ao editar a categoria, tente novamente em alguns minutos!",
   },
  };
 }
}
