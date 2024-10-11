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
  status: string;
  dish: Dish[];
}

const newOrders = [
    {
        "id": 1,
        "customer": "cust1",
        "date_of_order": "2024-12-10",
        "status": "Approved",
        "dish": [
            {
                "id": 1,
                "name": "",
                "quantity": 10,
                "price": 100,
                "ingredients": [],
                "allergens": []
            }
        ]
    },
    {
        "id": 2,
        "customer": "cust2",
        "date_of_order": "2024-12-10",
        "status": "Rejected",
        "dish": [
            {
                "id": 1,
                "name": "",
                "quantity": 10,
                "price": 100,
                "ingredients": [
                    {
                        "ingredient_name": "fish",
                        "quantity": 20,
                        "price": 10,
                    }
                ],
                "allergens": []
            }
        ]
    },
    {
        "id": 3,
        "customer": "cust3",
        "date_of_order": "2024-12-10",
        "status": "Rejected",
        "dish": [
            {
                "id": 1,
                "name": "",
                "quantity": 10,
                "price": 100,
                "ingredients": [],
                "allergens": [
                    "carrots"
                ]
            }
        ]
    }
]

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
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const ordersState = useOrdersStore((state) => state.orders);
    const { addOrder, deleteOrder } = useOrdersStore((state) => state);

    const switchOrder = (order: Order) => {
        setSelectedOrder(order);
        console.log("Selected dish:", order.dish);
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

  const filteredOrders = useMemo(() => {
    return newOrders.filter((order) => {
      const searchValue = search.toLowerCase();
      return (
        ("" + order.id).includes(searchValue) ||
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
          <OrdersDetailsCard order={selectedOrder} />
        ) : (
          <p>Select an order to view details</p>
        )}
      </div>
    </div>
  );
}


