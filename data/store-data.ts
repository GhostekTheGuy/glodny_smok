import { NNSdk } from "@/lib/sdk";

export const storeId =
  process.env.STORE ?? "48e0331a-140a-47c6-b995-e3bf1cd77051";
export const menu = await (async () => {
  return await NNSdk.getCurrentMenus(storeId);
})();
