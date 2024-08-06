import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Header() {
 return (
  <header className='flex h-[10%] w-full items-center justify-center p-4'>
   <div className='flex w-full items-center justify-between'>
    <div className='flex items-center gap-2'>
     <Button className='border-[1px] border-white'>Voltar</Button>
     <Button className='border-[1px] border-white'>Loja</Button>
    </div>

    <div className='flex items-center gap-3'>
     <p className='text-white'>vo1d</p>
     <div>
      <Avatar>
       <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
       <AvatarFallback>CN</AvatarFallback>
      </Avatar>
     </div>
    </div>
   </div>
  </header>
 );
}
