"use server";

export async function getCategory() {
 try {
  const categories = await fetch("http://localhost:3000/api/category/getall", {
   next: {
    tags: ["get-categories"],
    revalidate: 2,
   },
  });
  return categories.json();
 } catch (err) {
  return null;
 }
}
