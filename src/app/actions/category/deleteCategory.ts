"use server";

import { CategoryGateway } from "@/gateways/CategoryGateway";

export type CreateCategoryResponse = {
 sucess: boolean;
 error: {
  message: string | null;
 };
};

export async function DeleteCategory(id: string): Promise<CreateCategoryResponse> {
 if (!id) {
  return {
   sucess: false,
   error: {
    message: "id da categoria é obrigatório",
   },
  };
 }

 try {
  const categoryGateway = new CategoryGateway();

  const categoryExists = await categoryGateway.FindCategoryById(id);

  if (!categoryExists) {
   return {
    sucess: false,
    error: {
     message: "Categoria não encontrada",
    },
   };
  }

  const deleteCategory = await categoryGateway.deleteCategory(id);

  if (!deleteCategory) {
   return {
    sucess: false,
    error: {
     message: "Não foi possível deletar a categoria",
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
    message: "ocorreu um erro interno ao deletar a categoria",
   },
  };
 }
}
