"use client";

import { CategoryType } from "@/@types/category";
import { ProductType } from "@/@types/products";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RemoveProduct } from "@/app/actions/products/removeProduct";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditProductDialog } from "./editProductDialog";

type TableProps = {
 categories: CategoryType[];
};

export const Columns = ({ categories }: TableProps) => {
 const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
 const { toast } = useToast();

 const columns: ColumnDef<ProductType>[] = [
  {
   id: "select",
   header: ({ table }) => (
    <Checkbox
     checked={
      table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
     }
     onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
     aria-label='Select all'
    />
   ),
   cell: ({ row }) => (
    <Checkbox
     checked={row.getIsSelected()}
     onCheckedChange={value => row.toggleSelected(!!value)}
     aria-label='Select row'
    />
   ),
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
   accessorKey: "preco",
   header: ({ column }) => {
    return (
     <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      preço:
      <ArrowUpDown className='ml-2 h-4 w-4' />
     </Button>
    );
   },
   cell: ({ row }) => {
    return (
     <div className='lowercase'>{`${row.original.price_reals},${row.original.price_cents}`}</div>
    );
   },
   enableSorting: true,
   enableColumnFilter: true,
   filterFn: (row, _, filterValue) => {
    const cellValue = `${row.original.price_reals},${row.original.price_cents}`;
    return cellValue ? cellValue.toLowerCase().includes(filterValue.toLowerCase()) : false;
   },
  },

  {
   id: "actions",
   enableHiding: false,
   cell: ({ row }) => {
    return (
     <Dialog >
      <DropdownMenu>
       <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
         <span className='sr-only'>Abrir Menu</span>
         <MoreHorizontal className='h-4 w-4' />
        </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>

        <DropdownMenuItem>
         <DialogTrigger>editar produto</DialogTrigger>
        </DropdownMenuItem>

        <DropdownMenuItem
         onClick={async () => {
          const deletingProduct = await RemoveProduct({
           id: row.original.id as string,
           path: "/admin",
           refresh: true,
          });

          if (deletingProduct) {
           return toast({
            description: (
             <span className='flex items-center gap-4'>
              Produto deletado com sucesso!
              <Check size={20} className='text-green-900' />
             </span>
            ),
            duration: 1200,
           });
          } else {
           toast({
            description: (
             <span className='flex items-center gap-4'>
              Erro ao deletar o produto
              <XCircle size={20} className='text-red-900' />
             </span>
            ),
            duration: 1200,
           });
          }
         }}>
         deletar Produto
        </DropdownMenuItem>

        <DropdownMenuItem
         onClick={() => {
          navigator.clipboard.writeText(row.original.id as string);
          toast({
           description: (
            <span className='flex items-center gap-4'>
             Id do produto copiado com sucesso!
             <Check size={20} className='text-green-900' />
            </span>
           ),
           duration: 1200,
          });
         }}>
         copiar id
        </DropdownMenuItem>
       </DropdownMenuContent>
      </DropdownMenu>

      <EditProductDialog categories={categories} row={row} />
     </Dialog>
    );
   },
  },
 ];

 return columns;
};
