"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { StockSchema } from "@/@types/schemas/stockSchema";

export function AddStockForm() {
 const form = useForm<z.infer<typeof StockSchema>>({
  resolver: zodResolver(StockSchema),
  defaultValues: {
   content: "",
  },
 });

 function onSubmit(data: z.infer<typeof StockSchema>) {
  /* toast({
   title: "You submitted the following values:",
   description: (
    <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
     <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    </pre>
   ),
  }); */
 }

 return (
  <Form {...form}>
   <form
    onSubmit={form.handleSubmit(onSubmit)}
    className='flex h-full w-full flex-col items-start gap-6'>
    <FormField
     control={form.control}
     name='content'
     render={({ field }) => (
      <FormItem className='w-full'>
       <FormLabel>Conteúdo</FormLabel>
       <FormControl>
        <Textarea
         placeholder='Insira ou cole seu texto contendo o conteúdo do estoque'
         className='h-[30rem] w-full resize-none'
         {...field}
        />
       </FormControl>
       <FormDescription>Você deve adicionar o conteúdo linha por linha</FormDescription>
       <FormMessage />
      </FormItem>
     )}
    />
    <Button type='submit' className="w-full py-7">Enviar</Button>
   </form>
  </Form>
 );
}
