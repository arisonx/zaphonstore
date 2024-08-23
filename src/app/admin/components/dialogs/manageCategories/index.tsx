import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryType } from "@/@types/category";
import { ProductType } from "@/@types/products";
import { PackageSearch } from "lucide-react";
import { DataTable } from "./components/datatable";
interface IRemoveProductDialog {
 categories: CategoryType[] | undefined | null;
}

export async function ManageCategoriesDialog({ categories }: IRemoveProductDialog) {
 return (
  <Dialog>
   <DialogTrigger className='w-[20rem] rounded-lg bg-slate-900 py-6 text-white'>
    <span className='flex w-full items-center justify-between px-16'>
     <p className='text-base'>Gerenciar Categorias</p>
     <PackageSearch size={18} className='text-color' />
    </span>
   </DialogTrigger>
   <DialogContent className='flex h-[80%] w-full max-w-[90%] flex-col items-center'>
    <DialogHeader>
     <DialogTitle>Gerencie categorias</DialogTitle>

     <DialogDescription />
    </DialogHeader>

    <DataTable data={categories as CategoryType[]} />
   </DialogContent>
  </Dialog>
 );
}
