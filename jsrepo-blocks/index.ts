/*
	Installed from github/BarSwi/NomNomFrontSDK
*/

import { NomNomSDK } from "./NomNomSDK";

export { NomNomSDK } from "./NomNomSDK";

async function main() {
  const sdk = new NomNomSDK();
  const reponse = await sdk.getCurrentMenus(
    "6c90ed83-a3f4-4836-a22a-40099491b047",
  );
  console.log(JSON.stringify(reponse));
}

main();
