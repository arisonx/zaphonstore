import Image from "next/image";
import { inter } from "@/utils/fonts";
import { CategoryType } from "@/@types/category";
import { getCategory } from "@/app/actions/products/getcategory";

export async function Products() {
 const products: CategoryType[] = await getCategory();

 return (
  <>
   <ul className='flex flex-col items-center justify-center gap-8 pb-4'>
    {!products && <h2 className='text-white'>Sem produtos no momento</h2>}
    {products &&
     products.map(items => {
      return (
       <li className='justify-star flex w-[95%] flex-wrap gap-3' key={items.id}>
        <div className='flex w-full items-start'>
         <h2 className='text-start text-[1.2rem] font-bold text-gray-400'>{items.name}</h2>
        </div>
        {items.products &&
         items.products.map(item => {
          return (
           <div
            key={item.name}
            className='flex h-[250px] w-[220px] cursor-pointer flex-col rounded-2xl border-[1px] border-stone-950 px-4 pt-2'>
            <div className='flex h-[60%] w-full justify-center'>
             <Image
              src={item.image_url!}
              priority
              width={150}
              height={70}
              alt=''
              className='rounded-2xl'
             />
            </div>

            <div className='flex h-[40%] w-full flex-col pt-4 text-start'>
             <p className='pb-2 text-center text-sm font-medium uppercase text-gray-300'>
              {item.name}
             </p>
             <p className='flex gap-2 text-sm text-gray-300'>
              {item.price_reals && item.price_reals && (
               <span>{"R$ " + item.price_reals + "," + item.price_cents}</span>
              )}

              <span className='e text-sm font-medium text-green-700'>-{item.discount}%</span>
             </p>
             <p style={inter.style} className='text-sm text-gray-300'>
              Estoque: {item.stock}
             </p>
            </div>
           </div>
          );
         })}
       </li>
      );
     })}
   </ul>
  </>
 );
}
