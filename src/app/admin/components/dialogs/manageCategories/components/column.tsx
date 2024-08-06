import { CategoryType } from "@/@types/category";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, RowExpanding } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { EditCategoryDialog } from "./editCategoryDialog";
import { DeleteCategory } from "@/app/actions/category/deleteCategory";
import { RefreshCategory } from "@/app/actions/category/refreshCategory";

export const Columns = () => {
 const { toast } = useToast();

 const columns: ColumnDef<CategoryType>[] = [
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
   accessorKey: "qtd de produtos",
   header: ({ column }) => {
    return (
     <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      quantidade de produtos:
      <ArrowUpDown className='ml-2 h-4 w-4' />
     </Button>
    );
   },

   cell: ({ row }) => {
    return <div>{row.original.products?.length ?? 0}</div>;
   },
   enableSorting: true,
   enableColumnFilter: true,
   filterFn: (row, _, filterValue) => {
    const cellValue = row.original.products?.length ?? 0;
    return cellValue ? String(cellValue).includes(filterValue) : false;
   },
  },

  {
   id: "actions",
   enableHiding: false,
   cell: ({ row }) => {
    return (
     <Dialog>
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
         <DialogTrigger>editar categoria</DialogTrigger>
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

        <DropdownMenuItem
         onClick={async () => {
          const resultDeleteCategory = await DeleteCategory(row.original.id as string);

          if (!resultDeleteCategory.sucess) {
           toast({
            description: (
             <span className='flex items-center gap-4'>
              {resultDeleteCategory.error
               ? resultDeleteCategory.error.message
               : "Ocorreu um erro ao tentar deletar a categoria."}
              <XCircle size={20} className='text-red-900' />
             </span>
            ),
            duration: 1200,
           });
           return;
          }

          RefreshCategory({
           path: "/admin",
          });

          toast({
           description: (
            <span className='flex items-center gap-4'>
             Categoria deletada com sucesso!
             <Check size={20} className='text-green-900' />
            </span>
           ),
           duration: 1200,
          });
         }}>
         Deletar Categoria
        </DropdownMenuItem>
       </DropdownMenuContent>
      </DropdownMenu>
      <EditCategoryDialog row={row} />
     </Dialog>
    );
   },
  },
 ];

 return columns;
};
