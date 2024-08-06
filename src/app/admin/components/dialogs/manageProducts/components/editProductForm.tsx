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
import { useState, useTransition } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { LucideLoader, SquareArrowOutUpRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CreateProductResponse } from "@/app/actions/products/createProduct";
import Link from "next/link";
import { Row } from "@tanstack/react-table";
import { ProductType } from "@/@types/products";
import Image from "next/image";
import { AiOutlineClear } from "react-icons/ai";
import { RefreshProductAction } from "@/app/actions/products/refreshProducts";
import { UpdateProduct, UpdateProductResponse } from "@/app/actions/products/updateProduct";

interface IEditProductDialogForm {
 categories: CategoryType[];
 row: Row<ProductType>;
}

const productSchema = z.object({
 category_id: z.string({
  required_error: "por favor selecione a categoria",
 }),
 name: z
  .string({
   required_error: "Nome do produto obrigatório",
   message: "Por favor, insira o nome do produto.",
  })
  .min(1, {
   message: "Insira um nome maior para o produto",
  }),
 price_reals: z.string(),
 price_cents: z.string(),
 discount: z.string(),
 stock: z.string(),
 sold_off: z.boolean(),
 file: z
  .instanceof(File)
  .refine(file => /\.(webp|png|jpe?g)$/i.test(file.name), {
   message: "O arquivo deve ser uma imagem com as extensões .webp, .png, .jpg, jpeg",
  })
  .optional(),
});

export function EditProductDialogForm({ categories, row }: IEditProductDialogForm) {
 const { toast } = useToast();

 const [isPending, startTransition] = useTransition();
 const [previewImage, setPreviewImage] = useState<string | null>(null);

 const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
 const currentCategory = categoryMap.get(row.original.category_id);

 const form = useForm<z.infer<typeof productSchema>>({
  resolver: zodResolver(productSchema),
  defaultValues: {
   category_id: row.original.category_id,
   name: row.original.name,
   price_cents: row.original.price_cents?.toString(),
   price_reals: row.original.price_reals?.toString(),
   discount: row.original.discount?.toString(),
   stock: row.original.stock?.toString(),
   sold_off: row.original.sold_off,
   file: undefined,
  },
 });

 // file preview on page
 const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
   const reader = new FileReader();
   reader.onloadend = () => {
    setPreviewImage(reader.result as string);
   };
   reader.readAsDataURL(file);
  } else {
   setPreviewImage(null);
  }
 };

 const onSubmit = async (data: z.infer<typeof productSchema>) => {
  startTransition(async () => {
   if (!data.file) {
    const productUpdateResponse: CreateProductResponse = await UpdateProduct({
     category_id: data.category_id,
     discount: parseInt(data.discount),
     name: data.name,
     price_cents: parseInt(data.price_cents),
     price_reals: parseInt(data.price_reals),
     stock: parseInt(data.stock),
     sold_off: data.sold_off,
     id: row.original.id,
    });

    console.log(productUpdateResponse.sucess);

    if (!productUpdateResponse.sucess) {
     toast({
      title: "Falha ao atualizar o produto",
      description: productUpdateResponse.error.message,
      variant: "destructive",
      duration: 3000,
     });

     form.reset();
     RefreshProductAction({ path: "/admin" });
     return;
    }

    form.reset();
    RefreshProductAction({ path: "/admin" });

    toast({
     title: "Produto atualizado com sucesso!",
     description: "Vá até a página de produtos para visualizar",
     variant: "default",
     action: (
      <Link href='http://localhost:3000/' className='flex items-center'>
       <SquareArrowOutUpRight />
      </Link>
     ),
     duration: 3000,
    });

    return;
   }

   const formData = new FormData();
   formData.append("file", data.file as File);
   
   const productUpdateResponse: UpdateProductResponse = await UpdateProduct(
    {
     id: row.original.id,
     category_id: data.category_id,
     discount: parseInt(data.discount),
     name: data.name,
     price_cents: parseInt(data.price_cents),
     price_reals: parseInt(data.price_reals),
     stock: parseInt(data.stock),
     sold_off: data.sold_off,
    },
    formData
   );

   if (!productUpdateResponse.sucess) {
    toast({
     title: "Falha ao atualizar produto!",
     description: productUpdateResponse.error.message,
     variant: "destructive",
     duration: 3000,
    });
    form.reset();
    return;
   }

   form.reset();
   RefreshProductAction({ path: "/admin" });

   toast({
    title: "Produto atualizado com sucesso!",
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
   <div className='flex w-full justify-end px-4'>
    <Button
     className='flex w-[6rem] gap-2 text-xs'
     onClick={() => {
      form.reset();
      setPreviewImage(null);
     }}>
     Limpar
     <AiOutlineClear size={30} fill='red' />
    </Button>
   </div>
   <ScrollArea className='h-full w-full px-4 py-2'>
    <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full flex-col gap-8'>
     <FormField
      control={form.control}
      name='category_id'
      render={({ field }) => (
       <FormItem>
        <FormLabel>Selecione a categoria</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
         <FormControl className='w-full p-6'>
          <SelectTrigger>
           <SelectValue placeholder={currentCategory} />
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
         <Input placeholder={currentCategory} {...field} className='p-6' />
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
         <Input placeholder='$' {...field} type='number' className='p-6' />
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
         <Input placeholder='$' {...field} type='number' className='p-6' />
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
         <Input type='number' placeholder='%' {...field} className='p-6' />
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
      name='stock'
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

        <div className='flex h-20 w-full items-center justify-center'>
         <Image
          alt='imagem representando o produto'
          width={60}
          height={60}
          className='m-auto block h-[60px] max-h-[60px] w-[60px]'
          src={previewImage ?? (row.original.image_url as string)}
         />
        </div>

        <FormControl>
         <div className='flex w-full flex-col gap-2'>
          <div className='flex flex-col items-center gap-2'>
           <div className='flex w-full items-center justify-center gap-6'>
            <Input
             type='file'
             id='image_product'
             multiple={false}
             onChange={e => {
              handleFileChange(e);
              field.onChange(e.target.files ? e.target.files[0] : null);
             }}
             className='w-[24rem]] h-[4rem] border-none bg-transparent text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-900 hover:file:bg-violet-100'
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
       Confirmar
      </Button>
     )}
    </form>
   </ScrollArea>
  </Form>
 );
}
