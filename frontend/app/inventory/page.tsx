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


interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  supplier: string;
}

const ingredients = [
    { id: 1, name: 'Tomatoes', quantity: 10, unit: 'kg', expiryDate: '2024-10-12', supplier: 'Fruit Pte Ltd' },
    { id: 2, name: 'Chicken breast', quantity: 10, unit: 'kg', expiryDate: '2024-10-12', supplier: 'Boon Pte Ltd' },
    { id: 3, name: 'Potatoes', quantity: 10, unit: 'kg', expiryDate: '2024-10-12', supplier: 'Vegetable Pte Ltd' },
  ]

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  //const [searchTerm, setSearchTerm] = useState<string>(''); // State for the search input
  //const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]); // State for filtered results
  

  // Fetch data from an API or local source
  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('/api/inventory'); // Update this to your actual API endpoint
      const data = await response.json();
      setInventory(data);
      //setFilteredInventory(data); // Initially show all items
    };

    fetchInventory();
  }, []);

  

  return (
    <div className="mx-auto max-w-7xl px-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
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
          {ingredients.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.expiryDate}</TableCell>
              <TableCell>{item.quantity}{item.unit}</TableCell>
              <TableCell>{item.supplier}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryPage;
