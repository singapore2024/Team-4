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

interface Ingredient {
  ingredient_name: string;
  quantity: number;
}

interface Dish {
  dish_id: number;
  quantity: number;
  price: number;
  name: string;
  ingredients: Ingredient[];
}

interface Order {
  id: number;
  customer: string;
  date_of_order: string;
  status: "Approved" | "Rejected" | "Pending";
  dish: Dish[];
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
              <Card key={order.id} className="mb-4">
                <CardHeader>
                  <CardTitle>Order ID: {order.id}</CardTitle>
                  {order.dish.map((dish) => (
                    <CardTitle key={dish.dish_id}>
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
        <OrdersDetailsCard />
      </div>
    </div>
  );
}
