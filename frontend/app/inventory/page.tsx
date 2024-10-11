// app/inventory/page.tsx
"use client";
import { useEffect, useState } from 'react';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  // Fetch data from an API or local source
  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('/api/inventory'); // Update this to your actual API endpoint
      const data = await response.json();
      setInventory(data);
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;
