import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Products } from "@/components/Products";
import { RefreshProducts } from "@/components/refreshProduct";

export async function Dashboard() {
 return (
  <div className='h-screen w-screen'>
   <Header theme='dark' />
   <div className='flex w-full items-center justify-start px-7'>
    <RefreshProducts />
   </div>
   <main className='flex h-[80%] w-[full] flex-1 flex-col items-center gap-4'>
    <Products />
   </main>
   <Footer />
  </div>
 );
}
