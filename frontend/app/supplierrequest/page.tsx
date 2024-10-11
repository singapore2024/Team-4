"use client";

import SupplierRequest from "@/components/ui/supplierRequest";

const supplyData = [
  {
    name: "Flour",
    quantity: "10",
    price: "3",
    amount: "30",
  },
  {
    name: "Sugar",
    quantity: "5",
    price: "2",
    amount: "10",
  },
  {
    name: "Salt",
    quantity: "2",
    price: "1",
    amount: "2",
  },
  {
    name: "Butter",
    quantity: "3",
    price: "4",
    amount: "12",
  },
  {
    name: "Eggs",
    quantity: "10",
    price: "1",
    amount: "10",
  },
];

export default function Page() {
  return (
    <div className="p-10">
      <SupplierRequest supplyData={supplyData} />
    </div>
  );
}
