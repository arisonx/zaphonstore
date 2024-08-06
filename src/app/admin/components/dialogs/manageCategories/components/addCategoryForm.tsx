"use client";
import { CategorySchema } from "@/@types/schemas/addCategorySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createCategory, type CreateCategoryResponse } from "@/app/actions/category/createCategory";
import { useTransition } from "react";
import { LucideLoader, SquareArrowOutUpRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";


export function AddCategoryForm() {
 const { toast } = useToast();

 const [isPending, startTransition] = useTransition();

 const form = useForm<z.infer<typeof CategorySchema>>({
  resolver: zodResolver(CategorySchema),
  defaultValues: {
   name: "",
  },
 });

 const onSubmit = async (data: z.infer<typeof CategorySchema>) => {
  startTransition(async () => {
   const categoryResponse: CreateCategoryResponse = await createCategory(data);

   if (!categoryResponse.sucess) {
    toast({
     title: "Falha ao Criar Categoria",
     description: categoryResponse.error.message,
     variant: "destructive",
     duration: 3000,
    });
    return;
   }
  });

  toast({
   title: "Categoria criada com sucesso!",
   description: "Vá até a página de produtos para visualizar",
   variant: "default",
   action: (
    <Link href='http://localhost:3000/' className='flex items-center'>
     <SquareArrowOutUpRight />
    </Link>
   ),
   duration: 3000,
  });
 };

 return (
  <Form {...form}>
   <form
    className='flex w-full flex-col items-start gap-8 py-0'
    onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
     control={form.control}
     name='name'
     render={({ field }) => (
      <FormItem className='flex w-full flex-col items-start gap-2'>
       <FormLabel>Nome Da Categoria</FormLabel>
       <FormControl className='w-full p-7'>
        <Input placeholder='Insira o nome da categoria' {...field} />
       </FormControl>
       <FormDescription>Esse é o nome cujo aparecerá em cima dos produtos</FormDescription>
       <FormMessage />
      </FormItem>
     )}
    />
    {isPending ? (
     <Button disabled className='w-full py-7'>
      <LucideLoader className='mr-2 h-4 w-4 animate-spin' />
      Aguarde...
     </Button>
    ) : (
     <Button type='submit' className='w-full py-7'>
      Criar Categoria
     </Button>
    )}
   </form>
  </Form>
 );
}
