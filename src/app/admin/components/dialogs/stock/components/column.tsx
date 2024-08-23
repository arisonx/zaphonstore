"use client";

import { CategoryType } from "@/@types/category";
import { ProductType } from "@/@types/products";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { StockDialog } from "./stockDialog";
type TableProps = {
 categories: CategoryType[];
};

export const Columns = ({ categories }: TableProps) => {
 const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
 const { toast } = useToast();

 const columns: ColumnDef<ProductType>[] = [
  {
   id: "select",
   enableSorting: false,
   enableHiding: false,
  },

  {
   accessorKey: "nome",
   header: ({ column }) => {
    return (
     <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      nome:
      <ArrowUpDown className='ml-2 h-4 w-4' />
     </Button>
    );
   },

   cell: ({ row }) => {
    return <div className='lowercase'>{row.original.name}</div>;
   },
   enableSorting: true,
   enableColumnFilter: true,
   filterFn: (row, _, filterValue) => {
    const cellValue = row.original.name;
    return cellValue ? cellValue.toLowerCase().includes(filterValue.toLowerCase()) : false;
   },
  },

  {
   accessorKey: "categoria",
   header: ({ column }) => {
    return (
     <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      categoria:
      <ArrowUpDown className='ml-2 h-4 w-4' />
     </Button>
    );
   },
   cell: ({ row }) => {
    const categoryName = categoryMap.get(row.original.category_id);
    return <div className='lowercase'>{categoryName}</div>;
   },
   filterFn: (row, _, value) => {
    const cellValue = categoryMap.get(row.original.category_id);
    return cellValue ? cellValue.toLowerCase().includes(value.toLowerCase()) : false;
   },
   enableSorting: true,
   enableColumnFilter: true,
  },

  {
   id: "actions",
   enableHiding: false,
   cell: ({ row }) => {
    return (
     <Dialog>
      <DialogTrigger asChild>
       <Button variant='outline' className='flex gap-2 p-4'>
        Estoque
        <ArrowRight size={15} />
       </Button>
      </DialogTrigger>

      <StockDialog row={row}/>
     </Dialog>
    );
   },
  },
 ];

 return columns;
};
