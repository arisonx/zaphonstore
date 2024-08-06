"use server";

import { revalidatePath } from "next/cache";

interface IRefreshCategoryAction {
 path?: string;
}

export const RefreshCategory = async ({ path }: IRefreshCategoryAction) => {
 path ? revalidatePath(path, "page") : revalidatePath("/", "page");
};
