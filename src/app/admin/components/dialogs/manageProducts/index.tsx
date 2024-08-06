import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "./components/datatable";
import { CategoryType } from "@/@types/category";
import { ProductType } from "@/@types/products";
import { PackageSearch } from "lucide-react";

interface IRemoveProductDialog {
 categories: CategoryType[] | undefined | null;
 products: ProductType[];
}

export async function RemoveProductDialog({ categories, products }: IRemoveProductDialog) {
 return (
  <Dialog>
   <DialogTrigger className='w-[20rem] rounded-lg bg-slate-900 py-6 text-white'>
    <span className='flex w-full items-center justify-between px-16'>
     <p className='text-base'>Gerenciar produtos</p>
     <PackageSearch size={18} className='text-color' />
    </span>
   </DialogTrigger>
   <DialogContent className='flex h-[80%] w-full max-w-[90%] flex-col items-center'>
    <DialogHeader>
     <DialogTitle>Gerencie produtos</DialogTitle>

     <DialogDescription />
    </DialogHeader>

    <DataTable data={products} categories={categories as CategoryType[]} />
   </DialogContent>
  </Dialog>
 );
}
