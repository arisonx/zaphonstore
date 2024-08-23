import { RemoveProductDialog } from "./manageProducts";
import { LogsViewDialog } from "./logsview";
import { CategoryType } from "@/@types/category";
import { ProductType } from "@/@types/products";
import { ManageCategoriesDialog } from "./manageCategories";
import { StockDialog } from "./stock";
interface AdminDialogsData {
 categories: CategoryType[] | undefined | null;
 products: ProductType[] | undefined | null;
}
export function AdminDialogs({ categories, products }: AdminDialogsData) {
 return (
  <div className='flex h-[90%] w-full flex-col items-center gap-4'>
   <h2 className='pb-[2rem] pt-[5rem] text-xl text-white'>Zaphon Store Admin</h2>
   <div className='flex h-[65%] w-full flex-col items-center justify-center gap-4 rounded-md'>
    <RemoveProductDialog categories={categories} products={products as ProductType[]} />
    <ManageCategoriesDialog categories={categories} />
    <LogsViewDialog />
    <StockDialog categories={categories as CategoryType[]} products={products as ProductType[]} />
   </div>
  </div>
 );
}
