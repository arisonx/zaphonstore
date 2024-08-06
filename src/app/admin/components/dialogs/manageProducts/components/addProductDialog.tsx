import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
 DialogDescription,
} from "@/components/ui/dialog";
import { AddProductForm } from "./addProductForm";
import { CategoryType } from "@/@types/category";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface IAddProductForm {
 categories: CategoryType[];
}
export function AddProductDialog({ categories }: IAddProductForm) {
 return (
  <Dialog>
   <DialogTrigger asChild>
    <Button className='flex gap-2 border-2 py-6 px-2 text-sm' variant='ghost'>
     Criar produto
     <Plus size={15} className='text-color' />
    </Button>
   </DialogTrigger>

   <DialogContent className='flex h-[80%] w-full max-w-[90%] flex-col items-center'>
    <DialogHeader>
     <DialogTitle className='text-center'>Adicione novo um produto</DialogTitle>
     <DialogDescription />
    </DialogHeader>

    <AddProductForm categories={categories} />
   </DialogContent>
  </Dialog>
 );
}
