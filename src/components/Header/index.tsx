import { DiscordLogoIcon, MoonIcon, SunIcon, PersonIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

interface HeaderProps {
 theme: string;
}

export function Header({ theme }: HeaderProps) {
 return (
  <header className='flex h-[10%] w-full items-center justify-between border-b-[1px] border-b-zinc-900 px-8'>
   <h1 className='text-white'>zaphonstore</h1>

   <div className='flex gap-4'>
    <TooltipProvider>
     <Tooltip>
      <TooltipTrigger>
       {theme === "light" ? (
        <SunIcon className='text-white' width={20} height={20} />
       ) : (
        <MoonIcon className='text-white' width={20} height={20} />
       )}
      </TooltipTrigger>
      <TooltipContent>
       <p>Alterar Tema</p>
      </TooltipContent>
     </Tooltip>

     <Tooltip>
      <TooltipTrigger>
       <Link href='https://discord.gg/zaphoon' target='_blank' className='flex gap-2 text-white'>
        <DiscordLogoIcon className='text-white' width={20} height={20} />
       </Link>
      </TooltipTrigger>
      <TooltipContent>
       <p>Nosso Discord</p>
      </TooltipContent>
     </Tooltip>

     <Tooltip>
      <TooltipTrigger>
       <Link href='/auth' className='flex gap-2 text-white'>
        <PersonIcon className='text-white' width={20} height={20} />
        Login
       </Link>
      </TooltipTrigger>

      <TooltipContent>
       <p>Faça Login</p>
      </TooltipContent>
     </Tooltip>
    </TooltipProvider>
   </div>
  </header>
 );
}
