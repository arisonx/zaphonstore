"use client";
import { Button } from "@/components/ui/button";
import {
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 Dialog,
 DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import { AddCategoryForm } from "./addCategoryForm";

export function AddCategoryDialog() {
 return (
  <Dialog>
   <DialogTrigger  asChild>
    <Button variant='ghost' className='border-2 py-6'>
     Criar categoria
     <Plus size={15} />
    </Button>
   </DialogTrigger>
   <DialogContent className='h-[80%] w-[90%] max-w-full'>
    <DialogHeader>
     <DialogTitle>Criar categoria</DialogTitle>
     <DialogDescription/>
    </DialogHeader>
    <AddCategoryForm />
   </DialogContent>
  </Dialog>
 );
}
