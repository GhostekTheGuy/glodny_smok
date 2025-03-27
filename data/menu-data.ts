import { NNSdk } from "@/lib/sdk";

export const storeId = "dc93f046-5e00-4f85-88a5-a7b268cad7a4";
export const menu = await (async () => {
  return await NNSdk.getCurrentMenus(storeId);
})();
export const storeInformatons = await (async () => {
  return (await NNSdk.getStoreSettingsAndStatus(storeId)) as any;
})();
