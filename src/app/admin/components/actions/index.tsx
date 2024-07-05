import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";


export function Actions() {
  return (
    <main className="w-full h-[90%] flex flex-col gap-4 items-center  ">
      <h2 className="pt-[4rem] text-white">ADMIN</h2>

      <div
        className="flex flex-col items-center border-2
        gap-[1rem] w-[50%] py-8"
      >
        <Button className="w-[10rem]">
            Adicionar Produtos <FaPlus height={12} className="text-color"/>
        </Button>
        <Button className="w-[10rem]">Remover Produtos</Button>
        <Button className="w-[10rem]">Editar Produtos</Button>
        <Button className="w-[10rem]">Logs</Button>
        <Button className="w-[10rem]">Adicionar produtos</Button>
      </div>
    </main>
  );
}
