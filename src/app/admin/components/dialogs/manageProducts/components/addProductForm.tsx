"use client";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/@types/category";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { LucideLoader, SquareArrowOutUpRight } from "lucide-react";
import { productSchema } from "@/@types/schemas/addProductSchema";
import { useToast } from "@/components/ui/use-toast";
import { createProduct, CreateProductResponse } from "@/app/actions/products/createProduct";
import Link from "next/link";
import { RefreshProductAction } from "@/app/actions/products/refreshProducts";

interface AddProductFormData {
 categories: CategoryType[] | null | undefined;
}

export function AddProductForm({ categories }: AddProductFormData) {
 const { toast } = useToast();

 const [isPending, startTransition] = useTransition();

 const form = useForm<z.infer<typeof productSchema>>({
  resolver: zodResolver(productSchema),
  defaultValues: {
   name: "",
   price_reals: 0,
   price_cents: 0,
   discount: 0,
   stock_count: 0,
   sold_off: false,
   category_id: "",
   file: undefined,
  },
 });

 const onSubmit = async (data: z.infer<typeof productSchema>) => {
  startTransition(async () => {
   const formData = new FormData();
   formData.append("file", data.file);

   const productResponse: CreateProductResponse = await createProduct(
    {
     category_id: data.category_id,
     discount: data.discount,
     name: data.name,
     price_cents: data.price_cents,
     price_reals: data.price_reals,
     stock_count: data.stock_count,
     sold_off: data.sold_off,
    },
    formData
   );

   if (!productResponse.success) {
    toast({
     title: "Falha ao Criar Produto",
     description: productResponse.error.message,
     variant: "destructive",
     duration: 3000,
    });
    form.reset();
    return;
   }

   RefreshProductAction({ path: "admin" });
   form.reset();

   toast({
    title: "Produto criado com sucesso!",
    description: "Vá até a página de produtos para visualizar",
    variant: "default",
    action: (
     <Link href='http://localhost:3000/' className='flex items-center'>
      <SquareArrowOutUpRight />
     </Link>
    ),
    duration: 3000,
   });
  });
 };

 return (
  <Form {...form}>
   <ScrollArea className='h-full w-full px-4 py-0'>
    <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-8 px-1'>
     <FormField
      control={form.control}
      name='category_id'
      render={({ field }) => (
       <FormItem>
        <FormLabel>Selecione a categoria</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
         <FormControl className='w-full rounded-md border-2 py-6'>
          <SelectTrigger>
           <SelectValue placeholder='selecione' />
          </SelectTrigger>
         </FormControl>
         <SelectContent>
          {categories?.map((category: CategoryType, index) => {
           return (
            <SelectItem value={category.id as string} key={index} className='pt-2'>
             {category.name}
            </SelectItem>
           );
          })}
         </SelectContent>
        </Select>
        <FormMessage />
       </FormItem>
      )}
     />

     <FormField
      control={form.control}
      name='name'
      render={({ field }) => (
       <FormItem>
        <FormLabel>Nome do produto</FormLabel>
        <FormControl>
         <Input
          placeholder='digite o nome'
          {...field}
          className='w-full rounded-md border-2 p-6 py-6'
         />
        </FormControl>
        <FormDescription className='pt-3'>
         Esse é o nome que aparecerá a baixo do produto para identificálo.
        </FormDescription>
        <FormMessage />
       </FormItem>
      )}
     />

     <FormField
      control={form.control}
      name='price_reals'
      render={({ field }) => (
       <FormItem>
        <FormLabel>Preço do produto em Reais</FormLabel>
        <FormControl>
         <Input placeholder='$' {...field} type='number' className='border-2 p-6' />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />

     <FormField
      control={form.control}
      name='price_cents'
      render={({ field }) => (
       <FormItem>
        <FormLabel>Preço do produto em Centavos</FormLabel>
        <FormControl>
         <Input placeholder='$' {...field} type='number' className='border-2 p-6' />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />

     <FormField
      control={form.control}
      name='discount'
      render={({ field }) => (
       <FormItem>
        <FormLabel>Desconto</FormLabel>
        <FormControl>
         <Input
          type='number'
          placeholder='%'
          {...field}
          className='border-2 p-6 focus:outline-[1px]'
         />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />

     <FormField
      control={form.control}
      name='sold_off'
      render={({ field }) => (
       <FormItem className='flex items-center gap-6'>
        <FormLabel className='mt-2'>Esgotado?</FormLabel>
        <FormControl>
         <Switch id='airplane-mode' checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />

     <FormField
      control={form.control}
      name='stock_count'
      render={({ field }) => (
       <FormItem>
        <FormLabel>Estoque</FormLabel>
        <FormControl>
         <Input placeholder='digite o estoque' {...field} type='number' className='p-6' />
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />

     <FormField
      control={form.control}
      name='file'
      render={({ field }) => (
       <FormItem className='flex flex-col items-center gap-4'>
        <FormLabel htmlFor='avatar'>Imagem do produto</FormLabel>

        <FormControl>
         <div className='flex w-full flex-col gap-2'>
          <div className='flex flex-col items-center gap-2'>
           <div className='flex w-full items-center justify-center gap-6'>
            <Input
             type='file'
             multiple={false}
             onChange={e => field.onChange(e.target.files ? e.target.files[0] : null)}
             className='w-[24rem]] block h-[4rem] border-none bg-transparent text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-900 hover:file:bg-violet-100'
             name='file'
             accept='.png,.webp,.jpg'
            />
           </div>
          </div>
         </div>
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     {isPending ? (
      <Button disabled className='w-full py-7'>
       Aguarde...
       <LucideLoader className='mr-2 h-4 w-4 animate-spin' />
      </Button>
     ) : (
      <Button type='submit' className='w-full py-7'>
       Criar Produto
      </Button>
     )}
    </form>
   </ScrollArea>
  </Form>
 );
}
