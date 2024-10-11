"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
export type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  expiryDate: string;
  supplier: string;
}

export const columns: ColumnDef<Ingredient>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "item name",
    header: "Item name",
  },
  {
    accessorKey: "expiry date",
    header: "Expiry date",
  },
  {
    accessorKey: "Quantity",
    header: "quantity",
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
  },
]
