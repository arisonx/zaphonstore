"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Auth() {
 return (
  <div className='flex h-full w-full flex-col items-center justify-center gap-12'>
   <h2 className='text-2xl font-medium text-white'>Faça Login</h2>
   <div className='flex items-center gap-8 rounded-2xl border-[1px] border-gray-950 p-4'>
    <button className='flex items-center gap-2 text-white'>
     <Image src='/discord.svg' width={50} height={50} alt='Uma imagem simbolizando um robô' />
    </button>
    <button className='flex items-center gap-2 text-white'>
     <Image src='/google.svg' width={40} height={40} alt='Uma imagem simbolizando um robô' />
    </button>
    <button className='flex items-center gap-2 text-white'>
     <Image src='/facebook.svg' width={40} height={40} alt='Uma imagem simbolizando um robô' />
    </button>
    <button
     className='flex items-center gap-2 text-white'
     onClick={() =>
      signIn("github", {
       redirect: true,
       callbackUrl: "/",
      })
     }>
     <Image src='/github.svg' width={40} height={40} alt='Uma imagem simbolizando um robô' />
    </button>
   </div>
  </div>
 );
}
