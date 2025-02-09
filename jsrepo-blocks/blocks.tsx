export class NomNomSDK {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getCurrentMenus(restaurantId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/menus/${restaurantId}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    } catch (error) {
      throw new Error(`Error fetching menus: ${error}`)
    }
  }
}

