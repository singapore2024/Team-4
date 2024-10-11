"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import OrdersDetailsCard from "@/components/orders/OrderDetailsCard"
import axios from "axios";
import { useOrdersStore } from "@/store/OrdersState"

interface Ingredient {
  ingredient_name: string;
  quantity: number;
  price: number;
}

interface Dish {
  id: number;
  name: string;
  quantity: number;
  price: number;
  ingredients: Ingredient[];
  allergens: string[];
}

interface Order {
  id: number;
  customer: string;
  date_of_order: string;
  status: "Approved" | "Rejected" | "Pending";
  dish: Dish[];
}

interface InventoryItem {
    id: number,
    item_name: string,
    expiry_date: string,
    on_hand: number,
    price: number
}

interface IconProps extends React.SVGProps<SVGSVGElement> {}

function SearchIcon(props: IconProps): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

//search bar
export default function Component(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false); // Collapsible state
  const [orders, setOrders] = useState<Order[]>([]); // Store fetched orders
  const [inventoryMap, setInventoryMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const ordersState = useOrdersStore((state) => state.orders);
    const { addOrder, deleteOrder } = useOrdersStore((state) => state);

    const createInventoryMap = (inventory: InventoryItem[]) => {
        const inventoryMap: Record<string, number> = {}; // Initialize an empty object to store the map
        inventory.forEach((item) => {
            // Set item_name as the key and on_hand as the value
            inventoryMap[item.item_name] = item.on_hand;
        });

        return inventoryMap; 
    }

    const switchOrder = async (order: Order) => {
        try {
            const response = await axios.get("http://localhost:3001/inventory/all");
            const newInventoryMap = createInventoryMap(response.data); // Create the inventory map
            setInventoryMap(newInventoryMap);
            setSelectedOrder(order);
            console.log("Selected dish:", order.dish);
        }  catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    const handleConfirm = () => {
        // TODO: implement logic to confirm order
        // Create a new order object
        const newOrder = {
        id: "1", // Generate a unique ID for the order
        ingredient_name: "New Ingredient", // You can change this to a dynamic value
        quantity: 10, // Replace with a dynamic value
        price: 5.5, // Replace with a dynamic value
        total_price: 10 * 5.5, // Calculated total price
        };

        // Add the new order to the store
        addOrder(newOrder);
    }

    // Function to calculate total price for an order
    const calculateTotalPrice = (dishes: Dish[]) => {
        return dishes.reduce((total, dish) => total + dish.price * dish.quantity, 0).toFixed(2);
    };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3001/orders/all");
        setOrders(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); 

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase();
      return (
        ("" + order.id).includes(searchValue) ||
        order.customer.toLowerCase().includes(searchValue)
      );
    });
  }, [search, orders]); // Depend on orders and search

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex h-screen">
      {/* Left Side (Collapsible Section) */}
      <div className={`transition-all duration-300 ${isCollapsed ? "w-20" : "w-1/2"} overflow-auto`}>
        {/* Toggle Button */}
        <Button 
          className="mb-4" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Expand" : "Collapse"}
        </Button>

        {/* Show sidebar content conditionally */}
        {!isCollapsed && (
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8 pr-4 py-2 rounded-md w-full"
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {filteredOrders.map((order) => (
              <Card key={order.id} className="mb-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={() => switchOrder(order)}>
                <CardHeader>
                  <CardTitle>Order ID: {order.id}</CardTitle>
                  {order.dish.map((dish) => (
                    <CardTitle key={dish.id}>
                      {dish.quantity} x {dish.name}
                    </CardTitle>
                  ))}
                </CardHeader>
                <CardContent>
                  <CardDescription>Date of order: {order.date_of_order}</CardDescription>
                  <CardDescription>Customer: {order.customer}</CardDescription>
                  <CardDescription>Total price: ${calculateTotalPrice(order.dish)}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className={`transition-all duration-300 ${isCollapsed ? "w-full" : "w-1/2"} mt-6`}>
        {selectedOrder ? (
          <OrdersDetailsCard order={selectedOrder} inventory={inventoryMap} />
        ) : (
          <p>Select an order to view details</p>
        )}
      </div>
    </div>
  );
}
