"use server";

import { ProductType } from "@/@types/products";

export async function GetAllProducts() {
 try {
  const response = await fetch("http://localhost:3000/api/product/getall");
  const data: ProductType[] | undefined = await response.json();
  return data;
 } catch (e) {
  return null;
 }
}
