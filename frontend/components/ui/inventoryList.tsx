import axios from 'axios';

const API_URL = 'http://localhost:3000/inventory';

// Define the Ingredient type
interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    expiryDate: string;
    supplier: string;
  }
  

export async function getAllInventoryItems() {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

// Add a new InventoryItem
export async function addInventoryItem(InventoryItem: Omit<InventoryItem, 'id'>) {
    try {
      const response = await axios.post(`${API_URL}/add`, InventoryItem);
      return response.data;  // Return the newly added InventoryItem data
    } catch (error) {
      console.error('Error adding InventoryItem: ', error);
      throw error;  // Re-throw the error so it can be handled by the calling function
    }
  }