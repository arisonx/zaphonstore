"use server";

import { revalidatePath } from "next/cache";

interface IRefreshProductAction {
 path?: string;
}

export const RefreshProductAction = async ({ path }: IRefreshProductAction) => {
 path ? revalidatePath(path, "page") : revalidatePath("/", "page");
};
