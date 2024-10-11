"use client";

import axios from "axios";
import SupplierRequest from "@/components/ui/supplierRequest";
import React, { useState, useEffect } from "react";

interface Supply {
  name: string;
  quantity: string;
  price: string;
  amount: string;
}

interface SupplyData {
  supplyData: Supply[];
}

export default function Page() {
  const [supplyData, setSupplyData] = useState<Supply[]>([]);

  useEffect(() => {
    const fetchSupplyData = async () => {
      try {
        const response = await axios.get("localhost:3001/supply");
        setSupplyData(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchSupplyData();
  }, []);

  return (
    <div className="p-10">
      <SupplierRequest supplyData={supplyData} />
    </div>
  );
}
