import Link from "next/link";
import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import { CopyrightIcon } from "lucide-react";

export function Footer() {
 return (
  <footer className='flex h-[10%] w-full items-center justify-center gap-4 border-t-[1px] border-t-zinc-900'>
   <div className='flex items-center gap-3'>
    <CopyrightIcon className='text-white' width={20} height={20} />
    <h2 className='flex items-center text-white'>Developed By Voidex1</h2>
   </div>
   <div className='flex items-center justify-center gap-2'>
    <Link
     href='https://instagram.com/arison_reiss'
     className='font-bold text-white'
     target='_blank'>
     <InstagramLogoIcon width={24} height={24} />
    </Link>

    <Link href='https://github.com/arisonx' className='font-bold text-white' target='_blank'>
     <GitHubLogoIcon width={24} height={24} />
    </Link>
   </div>
  </footer>
 );
}
