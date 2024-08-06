"use client";
import { RefreshProductAction } from "@/app/actions/products/refreshProducts";
import { Button } from "@/components/ui/button";
import { SlReload } from "react-icons/sl";

interface IRefreshProducts {
 color?: "white" | "black";
}
export function RefreshProducts({ color }: IRefreshProducts) {
 const refreshproduct = async () => {
  await RefreshProductAction({ path: "/" });
 };

 return (
  <div>
   {color ? (
    <Button
     className='m-0 bg-transparent p-0 pt-3 text-white'
     variant='link'
     onClick={refreshproduct}>
     <SlReload size={25} color={color} />
    </Button>
   ) : (
    <Button
     className='m-0 bg-transparent p-0 pt-3 text-white'
     variant='link'
     onClick={refreshproduct}>
     <SlReload size={25} />
    </Button>
   )}
  </div>
 );
}
