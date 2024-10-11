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
 
import { Card, CardContent } from "@/components/ui/card"

interface InventoryItem {
  id: number;
  item_name: string;
  on_hand: number;
  expiry_date: string;
  supplier: string;
}

const exampleRecommendations = ['Your peas are expiring soon!', '', '']

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [errorMsg, setErrorMsg] = useState<Error | null>(null);
  
  // Fetch data from an API or local source
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getAllInventoryItems(); // Use the Axios function to get ingredients
        setInventory(data); // Update the state with the fetched ingredients
      } catch (error) {
        setErrorMsg(error as Error); // Optional: Set the error state if the request fails
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchInventory();
  }, []); // Empty dependency array means this 
  
  if (errorMsg) {
    return <div>Error: {errorMsg.message}</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-left">Inventory</h1>

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
