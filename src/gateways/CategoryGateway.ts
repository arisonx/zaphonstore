import { CategoryGatewayType } from "@/@types/Gateways/CategoryGatewayType";
import { prismaclient } from "@/lib/prisma/prismaclient";

export class CategoryGateway implements CategoryGatewayType {
  public async getAllCategories() {
    try {
      const categories = await prismaclient.category.findMany({
        include: {
          products: {},
        },
      });
      return categories;
    } catch (err) {
      return null;
    }
  }
}
