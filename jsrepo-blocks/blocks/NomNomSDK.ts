/*
	jsrepo 1.29.1
	Installed from github/BarSwi/NomNomFrontSDK
	30.01.2025
*/

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Utils } from "./Utils";
import { MenuResponse } from "./types";

export class NomNomSDK extends Utils {
  private client: AxiosInstance;

  constructor(baseURL: string = "http://localhost:8000/api") {
    super();
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Fetches the current menus for a specified restaurant.
   *
   * This method sends a GET request to the `/menus/current` endpoint with the `store`
   * query parameter set to the provided restaurant ID. It retrieves a list of menus
   * that are currently active for the given restaurant.
   *
   * @param {string} restaurandId - The unique identifier of the restaurant for which to fetch current menus.
   *
   * @returns {Promise<any[]>} A promise that resolves to an array of current menus. Each menu object in the array
   * may contain details such as the menu name, items, availability, and other metadata.
   *
   * @throws {Error} Throws an error if the API request fails. The error may include details
   * from the server or a general error message if the request could not be completed.
   *
   * @example
   * const sdk = new ApiSDK();
   *
   * sdk.getCurrentMenus("restaurant123")
   *   .then((menus) => {
   *     console.log("Current Menus:", menus);
   *   })
   *   .catch((error) => {
   *     console.error("Error fetching current menus:", error);
   *   });
   */
  async getCurrentMenus(restaurandId: string): Promise<any> {
    try {
      const response: AxiosResponse<MenuResponse> = await this.client.get(
        `/menus/current?store=${restaurandId}`,
      );
      return this.populateCrossSaleItems(response.data.menus);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Error handler for Axios requests.
   * @param error - The error object.
   */
  private handleError(error: any): void {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}
