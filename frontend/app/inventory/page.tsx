"use client";
import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { getAllInventoryItems } from '@/components/ui/inventoryList';
import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface InventoryItem {
  id: number;
  item_name: string;
  on_hand: number;
  expiry_date: string;
  supplier: string;
}

const exampleRecommendations = ['Your peas are expiring soon!', 'A lot of orders for Har Cheong Gai, maybe order more ingredients?', 'Rice is running low, predicted to not meet demand']

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [errorMsg, setErrorMsg] = useState<Error | null>(null);
  
  // Fetch data from an API or local source
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getAllInventoryItems(); 
        setInventory(data);  // This updates the state, which triggers a re-render
      } catch (error) {
        setErrorMsg(error as Error);
        console.error('Error fetching ingredients:', error);
      }
    };
  
    fetchInventory(); // Initial fetch
  
    const interval = setInterval(fetchInventory, 60000); // Fetch every 60 seconds
  
    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, []); // Runs once on mount
  
  if (errorMsg) {
    return <div>Error: {errorMsg.message}</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-left">Inventory</h1>
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-5">
            {exampleRecommendations.map((rec, index) => (
                <CarouselItem key={index} className='pl-4'>
                <div className="pl-5">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-2xl font-semibold">{rec}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Table className="w-full divide-y divide-gray-200">
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Item name</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Supplier</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.item_name}</TableCell>
              <TableCell>{item.expiry_date}</TableCell>
              <TableCell>{item.on_hand} kg</TableCell>
              <TableCell>{item.supplier}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryPage;
