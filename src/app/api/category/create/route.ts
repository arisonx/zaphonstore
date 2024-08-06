import { CategoryType } from "@/@types/category";
import { CategoryGateway } from "@/gateways/CategoryGateway";

export async function POST(req: Request) {
 const category: CategoryType = await req.json();

 const categoryGateway = new CategoryGateway();

 try {
  categoryGateway.createCategory(category);
  return new Response("", {
   status: 200,
  });
 } catch (err) {
  return new Response("Internal server error", { status: 500 });
 }
}
