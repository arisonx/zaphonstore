import { ProductType } from "@/@types/products";
import { Button } from "@/components/ui/button";
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import { Row } from "@tanstack/react-table";
import { StockTable } from "./stockTable";
import { AddStockForm } from "./addStockForm";

interface StockDialogI {
 row: Row<ProductType>;
}
export function StockDialog({ row }: StockDialogI) {
 return (
  <DialogContent className='flex h-[80%] w-[90%] max-w-full flex-col items-center'>
   <DialogHeader className='w-full'>
    <DialogTitle className='flex gap-2 text-start'>
     <span className='text-green-500'>{row.original.name}</span>-
     <span className='text-pink-400'>Estoque</span>
    </DialogTitle>
   </DialogHeader>
   <DialogDescription>
    Fique ciente que após qualquer alteração, não será possível desfazê-las!
   </DialogDescription>
   <Dialog>
    <StockTable row={row} />
    <DialogContent className='flex h-[80%] w-[90%] max-w-full flex-col gap-8'>
     <DialogTitle>Adicione estoque ao seu produto</DialogTitle>
     <DialogDescription />
     <AddStockForm />
    </DialogContent>
   </Dialog>
  </DialogContent>
 );
}
