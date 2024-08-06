import { CategoryType } from "@/@types/category";
import { CategoryGatewayType } from "@/@types/Gateways/CategoryGatewayType";
import { prismaclient } from "@/lib/prisma/prismaclient";

export class CategoryGateway implements CategoryGatewayType {
 public async getAllCategories() {
  try {
   const categories = await prismaclient.category.findMany({
    include: {
     products: {},
    },
   });
   return categories;
  } catch (err) {
   return null;
  }
 }

 public async createCategory(category: CategoryType) {
  const newCategory = await prismaclient.category.create({
   data: {
    name: category.name,
   },
  });
  return newCategory;
 }

 public async FindCategoryById(id: string) {
  try {
   const categoryExists = await prismaclient.category.findUnique({
    where: {
     id,
    },
   });

   return categoryExists;
  } catch (err) {
   return null;
  }
 }

 public async updateCategory(category: CategoryType) {
  try {
   const newCategory = await prismaclient.category.update({
    where: {
     id: category.id,
    },
    data: {
     name: category.name,
    },
   });

   if (!newCategory) {
    return null;
   }

   return newCategory;
  } catch (err) {
   return null;
  }
 }

 public async deleteCategory(id: string) {
  try {
   await prismaclient.category.delete({
    where: {
     id,
    },
    include: {
     products: {},
    },
   });
   return true;
  } catch (err) {
   return null;
  }
 }
}
