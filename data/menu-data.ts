import { NNSdk } from "@/lib/sdk";

export const storeId = "66adb13c-3115-4c84-aba2-4c4a5caae968";
export const menu = await (async () => {
  return await NNSdk.getCurrentMenus(storeId);
})();
export const storeInformatons = await (async () => {
  return (await NNSdk.getStore(storeId)) as any;
})();
