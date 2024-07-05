import { ChevronDown } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Products } from "@/components/Products";

export  async function Dashboard() {
  return (
    <div className="w-full h-full">
      <Header theme="dark" />
      <main className="flex  flex-auto flex-col gap-4 items-center">
        <h2 className="flex gap-2 text-white mt-4">
          Categorias
          <ChevronDown className="text-slate-100" />
        </h2>
        <Products />
      </main>
      <Footer />
    </div>
  );
}
