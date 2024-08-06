export type ProductType = {
 id?: string;
 name: string;
 stock: number | null;
 price_reals: number | null;
 price_cents: number | null;
 discount: number | null;
 image_key?: string | null;
 sold_off: boolean;
 image_url?: string | null;
 category_id: string;
};
