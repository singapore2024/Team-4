import { create } from "zustand";
import { persist } from "zustand/middleware";

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
export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],

      // Add an order
      addOrder: (order: Order) =>
        set((state) => {
          const existingOrder = state.orders.find(
            (existing) => existing.ingredient_name === order.ingredient_name
          );

          if (existingOrder) {
            // Update quantity and total_price if the ingredient already exists
            return {
              orders: state.orders.map((existing) =>
                existing.ingredient_name === order.ingredient_name
                  ? {
                      ...existing,
                      quantity: existing.quantity + order.quantity,
                      total_price: existing.total_price + order.total_price,
                    }
                  : existing
              ),
            };
          } else {
            // Add the new order if ingredient doesn't exist
            return {
              orders: [...state.orders, order],
            };
          }
        }),

      // Delete an order by its id
      deleteOrder: (id: string) =>
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        })),
    }),
    {
      name: "orders-storage",
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);