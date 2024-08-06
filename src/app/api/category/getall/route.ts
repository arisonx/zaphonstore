import { CategoryGateway } from "@/gateways/CategoryGateway";

export async function GET() {
 const categoryGateway = new CategoryGateway();

 try {
  const categories = await categoryGateway.getAllCategories();

  return new Response(JSON.stringify(categories), {
   status: 200,
  });
 } catch (err) {
  return new Response("Internal server error", { status: 500 });
 }
}
