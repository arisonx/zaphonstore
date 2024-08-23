import { ProductType } from "@/@types/products";

export type GetByIdResponse = {
 sucess: boolean;
 error: {
  message: string | null;
 };
 product: ProductType | null;
};

export async function GetById(id: string): Promise<GetByIdResponse> {
 try {
  const productExists = await fetch("http://localhost:3000/api/product/get-unique", {
   method: "POST",
   body: JSON.stringify({ product_id: id }),
   next: {
    revalidate: 1000,
   },
  });

  if (productExists.status !== 200) {
   return { sucess: false, error: { message: "Product not found" }, product: null };
  }

  const product = await productExists.json();

  return {
   error: {
    message: null,
   },
   product: product,
   sucess: true,
  };
 } catch (err) {
  return {
   sucess: false,
   error: { message: "Error fetching product data" },
   product: null,
  };
 }
}
