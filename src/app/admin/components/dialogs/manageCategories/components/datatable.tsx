"use client";
import * as React from "react";
import {
 ColumnFiltersState,
 SortingState,
 VisibilityState,
 flexRender,
 getCoreRowModel,
 getFilteredRowModel,
 getPaginationRowModel,
 getSortedRowModel,
 useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
 DropdownMenu,
 DropdownMenuCheckboxItem,
 DropdownMenuContent,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { CategoryType } from "@/@types/category";
import { RefreshProducts } from "@/components/refreshProduct";
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectLabel,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { Columns } from "./column";
import{AddCategoryDialog} from './addCategoryDialog'

interface IDaataTable {
 data: CategoryType[];
}

export function DataTable({ data }: IDaataTable) {
 const [sorting, setSorting] = React.useState<SortingState>([]);
 const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
 const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
 const [rowSelection, setRowSelection] = React.useState({});
 const [filterData, setFilterData] = React.useState("nome");

 const columns = Columns();

 const table = useReactTable({
  data,
  columns,
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  state: {
   sorting,
   columnFilters,
   columnVisibility,
   rowSelection,
  },
 });

 return (
  <div className='h-full w-full'>
   <div className='mb-12 flex items-center py-4'>
    <div className='flex items-center gap-4'>
     <Input
      placeholder='Filtrar Produtos...'
      value={(table.getColumn(filterData)?.getFilterValue() as string) ?? ""}
      onChange={event => {
       table.getColumn(filterData)?.setFilterValue(event.target.value);
      }}
      className='max-w-sm border-2 py-6'
     />

     <Select onValueChange={setFilterData}>
      <SelectTrigger className='w-[15rem] border-2 py-6'>
       <SelectValue placeholder='Filtrar' />
      </SelectTrigger>
      <SelectContent>
       <SelectGroup>
        <SelectLabel>Selecione</SelectLabel>
        <SelectItem value='nome'>nome</SelectItem>
        <SelectItem value='qtd de produtos'>qtd de produtos</SelectItem>
       </SelectGroup>
      </SelectContent>
     </Select>

     <AddCategoryDialog/>
     
    </div>

    <DropdownMenu>
     <DropdownMenuTrigger asChild>
      <Button variant='outline' className='ml-auto w-[8rem] border-2 py-6'>
       Colunas <ChevronDown className='ml-2 h-4 w-4' />
      </Button>
     </DropdownMenuTrigger>

     <DropdownMenuContent align='end' className='w-[8rem] border-2 border-zinc-800'>
      {table
       .getAllColumns()
       .filter(column => column.getCanHide())
       .map(column => {
        return (
         <DropdownMenuCheckboxItem
          key={column.id}
          className='capitalize'
          checked={column.getIsVisible()}
          onCheckedChange={value => column.toggleVisibility(!!value)}>
          {column.id}
         </DropdownMenuCheckboxItem>
        );
       })}
     </DropdownMenuContent>
    </DropdownMenu>
   </div>

   <div className='pb-6'>
    <RefreshProducts color='black' />
   </div>

   <div className='rounded-md'>
    <Table>
     <TableHeader className='border-b-2 border-b-zinc-400'>
      {table.getHeaderGroups().map(headerGroup => (
       <TableRow key={headerGroup.id}>
        {headerGroup.headers.map(header => {
         return (
          <TableHead key={header.id}>
           {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
         );
        })}
       </TableRow>
      ))}
     </TableHeader>
     <TableBody className='border-b-[2px] border-b-zinc-400'>
      {table.getRowModel().rows?.length ? (
       table.getRowModel().rows.map(row => (
        <TableRow
         key={row.id}
         data-state={row.getIsSelected() && "selected"}
         className='border-b-[2px] border-b-zinc-400'>
         {row.getVisibleCells().map(cell => (
          <TableCell key={cell.id}>
           {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
         ))}
        </TableRow>
       ))
      ) : (
       <TableRow>
        <TableCell colSpan={columns.length} className='h-24 text-center'>
         Sem Resultados...
        </TableCell>
       </TableRow>
      )}
     </TableBody>
    </Table>
   </div>
   <div className='flex items-center justify-end space-x-2 py-4'>
    <div className='flex-1 text-sm text-muted-foreground'>
     {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{" "}
     row(s) selected.
    </div>
    <div className='space-x-2'>
     <Button
      variant='outline'
      size='sm'
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}>
      Anterior
     </Button>
     <Button
      variant='outline'
      size='sm'
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}>
      Próximo
     </Button>
    </div>
   </div>
  </div>
 );
}
