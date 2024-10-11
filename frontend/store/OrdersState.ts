import { create } from "zustand";

// Define the type for each order object
type Order = {
  id: string;  // Assuming orders have an 'id' for easy identification
  ingredient_name: string;
  quantity: number;
  price: number;
  total_price: number;
};

// Define the state shape for the store
type OrdersState = {
  orders: Order[];  // The array of orders
  addOrder: (order: Order) => void;  // Function to add an order
  deleteOrder: (id: string) => void; // Function to delete an order by its id
};

// Create the Zustand store
export const useOrdersStore = create<OrdersState>((set) => ({
    orders: [],  // Initialize orders array as empty

    // Add an order
    addOrder: (order: Order) =>
        set((state) => ({
            orders: [...state.orders, order],  // Add the new order to the array
    })),

    // Delete an order by its id
    deleteOrder: (id: string) =>
        set((state) => ({
           orders: state.orders.filter((order) => order.id !== id),  // Filter out the order by id
    })),
}));