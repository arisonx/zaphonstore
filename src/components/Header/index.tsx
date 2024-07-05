import {
  DiscordLogoIcon,
  MoonIcon,
  SunIcon,
  PersonIcon,
  InstagramLogoIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface HeaderProps {
  theme: string;
}

export function Header({ theme }: HeaderProps) {
  return (
    <header
      className="w-full h-[5rem] flex px-8 justify-between items-center
    border-b-[1px] border-b-zinc-900
    "
    >
      <h1 className="text-white">zaphonstore</h1>

      <div className="flex gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {theme === "light" ? (
                <SunIcon className="text-white" width={20} height={20} />
              ) : (
                <MoonIcon className="text-white" width={20} height={20} />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Alterar Tema</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Link
                href="https://discord.gg/zaphoon"
                target="_blank"
                className="text-white flex gap-2"
              >
                <DiscordLogoIcon
                  className="text-white"
                  width={20}
                  height={20}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Nosso Discord</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Link href="/auth" className="text-white flex gap-2">
                <PersonIcon className="text-white" width={20} height={20} />
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
