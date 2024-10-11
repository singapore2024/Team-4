"use client";

import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface SupplyData {
  name: string;
  quantity: string;
  price: string;
  amount: string;
}

interface SupplierRequestProps {
  supplyData: SupplyData[];
}

function SupplierRequest({ supplyData }: SupplierRequestProps) {
  const handleOrder = async (supply: SupplyData[]) => {
    try {
      const response = await axios.post("localhost:3001/supply/add", {
        supply,
      });

      if (response.status === 200) {
        alert("Order placed successfully");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Supplier Request</CardTitle>
        <CardDescription>Request for ingredients from supplier</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient</TableHead>
              <TableHead className="hidden sm:table-cell">
                Quantity (KG)
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                Price ($/KG)
              </TableHead>
              <TableHead className="hidden md:table-cell">Amount ($)</TableHead>
              <TableHead className="text-right sr-only">Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplyData.map((supply, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{supply.name}</div>
                </TableCell>
                <TableCell className=" flex text-sm text-muted-foreground items-center gap-2">
                  <Input
                    name={`inputForQuantity-${index}`}
                    type="number"
                    defaultValue={supply.quantity}
                    className="w-16"
                  />
                  KG
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  ${supply.price}/KG
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  ${supply.amount}
                </TableCell>
                <TableCell className="text-right">
                  <Button color="success" onClick={() => handleOrder([supply])}>
                    Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Button color="primary" onClick={() => handleOrder(supplyData)}>Order All</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SupplierRequest;
