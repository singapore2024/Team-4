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
import { getAllInventoryItems, addIngredient } from '@/components/ui/inventoryList';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  expiryDate: string;
  supplier: string;
}

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [errorMsg, setErrorMsg] = useState<Error | null>(null);
  //const [searchTerm, setSearchTerm] = useState<string>(''); // State for the search input
  //const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]); // State for filtered results
  

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
    <div className="mx-auto max-w-7xl px-5">
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
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.expiryDate}</TableCell>
              <TableCell>{item.quantity} kg</TableCell>
              <TableCell>{item.supplier}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryPage;
