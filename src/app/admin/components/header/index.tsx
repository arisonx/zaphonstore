import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full h-[10%] p-4 flex items-center justify-center">
      <div className="flex w-full items-center  justify-between">
        <div className="flex items-center gap-4">
          <Button>Voltar</Button>
          <Button>Loja</Button>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-white">vo1d</p>
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
