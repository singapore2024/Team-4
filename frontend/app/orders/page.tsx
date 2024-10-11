"use client"

import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import OrdersDetailsCard from "@/components/orders/OrderDetailsCard"

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
  order_id: number;
  customer: string;
  date_of_order: string;
  status: "Approved" | "Rejected";
  dish: Dish[];
}

const orders: Order[] = [
  {
    order_id: 1,
    customer: "Lynn",
    date_of_order: "2012-12-12",
    status: "Approved",
    dish: [
      {
        dish_id: 1,
        quantity: 1,
        price: 10.99,
        name: "Plain Rice",
        ingredients: [{ ingredient_name: "Rice", quantity: 1 }],
      },
    ],
  },
  {
    order_id: 2,
    customer: "John",
    date_of_order: "2023-05-15",
    status: "Rejected",
    dish: [
      {
        dish_id: 2,
        quantity: 2,
        price: 15.99,
        name: "Sandwich",
        ingredients: [
          { ingredient_name: "Bread", quantity: 1 },
          { ingredient_name: "Chicken", quantity: 1 },
        ],
      },
    ],
  },
  {
    order_id: 3,
    customer: "Emma",
    date_of_order: "2023-05-16",
    status: "Approved",
    dish: [
      {
        dish_id: 3,
        quantity: 1,
        price: 12.99,
        name: "Chicken",
        ingredients: [
          { ingredient_name: "Rice", quantity: 1 },
          { ingredient_name: "Chicken", quantity: 1 },
        ],
      },
    ],
  },
];

//icons

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

  // Function to calculate total price for an order
  const calculateTotalPrice = (dishes: Dish[]) => {
    return dishes.reduce((total, dish) => total + dish.price * dish.quantity, 0).toFixed(2);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase();
      return (
        ("" + order.order_id).includes(searchValue) ||
        order.customer.toLowerCase().includes(searchValue)
      );
    });
  }, [search]);

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
              <Card key={order.order_id} className="mb-4">
                <CardHeader>
                  <CardTitle>Order ID: {order.order_id}</CardTitle>
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


