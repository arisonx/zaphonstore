export async function getImageToStorage(imageKey: string): Promise<string | void> {
 const getProductImageUrl = await fetch("http://localhost:3000/api/uploads/getimage", {
  body: JSON.stringify(imageKey),
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
 });

 const ProductImageUrl = (await getProductImageUrl.json()) as string;

 return ProductImageUrl;
}
