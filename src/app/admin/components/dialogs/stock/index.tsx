import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { PackageSearch } from "lucide-react";
import { DataTable } from "./components/datatable";
import { ProductType } from "@/@types/products";
import { CategoryType } from "@/@types/category";

interface StockDialogI {
 products: ProductType[];
 categories: CategoryType[];
}
export async function StockDialog({ categories, products }: StockDialogI) {
 return (
  <Dialog>
   <DialogTrigger className='w-[20rem] rounded-lg bg-slate-900 py-6 text-white'>
    <span className='flex w-full items-center justify-between px-16'>
     <p className='text-base'>Gerenciar Estoque</p>
     <PackageSearch size={18} className='text-color' />
    </span>
   </DialogTrigger>
   <DialogContent className='flex h-[80%] w-full max-w-[90%] flex-col items-center'>
    <DialogHeader>
     <DialogTitle>Vá para o estoque do produto desejado</DialogTitle>

     <DialogDescription />
    </DialogHeader>
    <DataTable categories={categories} data={products} />
   </DialogContent>
  </Dialog>
 );
}
