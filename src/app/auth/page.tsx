"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Auth() {
  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-12">
      <h2 className="text-white font-medium text-2xl">Faça Login</h2>
      <div className="flex items-center gap-8 border-[1px] border-gray-950 rounded-2xl p-4">
        <button className="text-white flex gap-2 items-center">
          <Image
            src="/discord.svg"
            width={50}
            height={50}
            alt="Uma imagem simbolizando um robô"
          />
        </button>
        <button className="text-white flex gap-2 items-center">
          <Image
            src="/google.svg"
            width={40}
            height={40}
            alt="Uma imagem simbolizando um robô"
          />
        </button>
        <button className="text-white flex gap-2 items-center">
          <Image
            src="/facebook.svg"
            width={40}
            height={40}
            alt="Uma imagem simbolizando um robô"
          />
        </button>
        <button
          className="text-white flex gap-2 items-center"
          onClick={() =>
            signIn("github", {
              redirect: true,
              callbackUrl: "/",
            })
          }
        >
          <Image
            src="/github.svg"
            width={40}
            height={40}
            alt="Uma imagem simbolizando um robô"
          />
        </button>
      </div>
    </div>
  );
}
