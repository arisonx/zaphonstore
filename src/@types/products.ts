import { Stock } from "./stock";

export type ProductType = {
 id?: string;
 name: string;
 stock_count?: number | null;
 category_id: string | undefined;
 price_reals: number | null;
 price_cents: number | null;
 discount: number | null;
 image_key?: string | null;
 sold_off: boolean;
 image_url?: string | null;
 stocks?: Stock | null;
 stock_id?: string | null;
};
