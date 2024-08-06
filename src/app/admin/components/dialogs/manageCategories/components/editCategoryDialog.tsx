import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
   } from "@/components/ui/dialog";
   import { EditCategoryForm } from "./editCategoryForm";
   import { CategoryType } from "@/@types/category";
   import { Row } from "@tanstack/react-table";
 
   interface IEditCategoryDialog {
    row: Row<CategoryType>;
   }
   
   export function EditCategoryDialog({  row }: IEditCategoryDialog) {
    return (
     <DialogContent className='h-[80%] w-[90%] max-w-full flex flex-col justify-start'>
      <DialogHeader>
       <DialogTitle>Editar Produto</DialogTitle>
       <DialogDescription>
        Fique ciente que após qualquer alteração não será possível desfazê-las!
       </DialogDescription>
      </DialogHeader>
      <EditCategoryForm   row={row}/>
     </DialogContent>
    );
   }
   