import {
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { EditProductDialogForm } from "./editProductForm";
import { CategoryType } from "@/@types/category";
import { Row } from "@tanstack/react-table";
import { ProductType } from "@/@types/products";

interface IEditProductDialog {
 categories: CategoryType[];
 row: Row<ProductType>;
}

export function EditProductDialog({ categories, row }: IEditProductDialog) {
 return (
  <DialogContent className='h-[80%] w-[90%] max-w-full'>
   <DialogHeader>
    <DialogTitle>Editar Produto</DialogTitle>
    <DialogDescription>
     Fique ciente que após qualquer alteração não será possível desfazê-las!
    </DialogDescription>
   </DialogHeader>
   <EditProductDialogForm categories={categories} row={row} />
  </DialogContent>
 );
}
