import { GetAllProducts } from "../actions/products/getAllProduct";
import { AdminDialogs } from "./components/dialogs";
import { Header } from "./components/header";
import { getCategory } from "@/app/actions/products/getcategory";

export default async function Admin() {
 const categories = await getCategory();

 const products = await GetAllProducts();

 return (
  <main className='h-screen w-screen'>
   <Header />
   <AdminDialogs categories={categories} products={products} />
  </main>
 );
}
