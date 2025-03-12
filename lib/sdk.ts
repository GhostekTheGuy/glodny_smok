import { NomNomSDK } from "@/jsrepo-blocks";

const API_URL = "http://150.230.156.203:443/api";
const STORE_ID = "6c90ed83-a3f4-4836-a22a-40099491b047";

// export class MenuSDK {
//   constructor(private baseUrl: string = API_URL) {}

//   async getCurrentMenu() {
//     try {
//       console.log("Fetching menu from API...")
//       const response = await fetch(`${this.baseUrl}/menus/current?store=${STORE_ID}`)
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       console.log("API Response:", data)
//       if (data && data[0]) {
//         return data[0]
//       }
//       console.log("Using local data as fallback")
//       return localMenuData[0]
//     } catch (error) {
//       console.warn("Failed to fetch menu from API, using local data:", error)
//       return localMenuData[0]
//     }
//   }
// }

export const NNSdk = new NomNomSDK(API_URL);
