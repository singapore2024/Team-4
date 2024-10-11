/**
 * v0 by Vercel.
 * @see https://v0.dev/t/g3OdZGmaNqd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

interface Filters {
  status: string[];
  date: {
    from: string | null;
    to: string | null;
  };
  amount: {
    min: string | null;
    max: string | null;
  };
}

export default function Component(): JSX.Element {
  const [search, setSearch] = useState<string>("")
  const [filters, setFilters] = useState<Filters>({
    status: [],
    date: {
      from: null,
      to: null,
    },
    amount: {
      min: null,
      max: null,
    },
  })

  const orders: Order[] = [
    {
      id: "ORD001",
      date: "2023-05-01",
      total: 1234.56,
      status: "Pending",
    },
    {
      id: "ORD002",
      date: "2023-05-02",
      total: 567.89,
      status: "Shipped",
    },
    {
      id: "ORD003",
      date: "2023-05-03",
      total: 987.65,
      status: "Delivered",
    },
    {
      id: "ORD004",
      date: "2023-05-04",
      total: 321.09,
      status: "Cancelled",
    },
    {
      id: "ORD005",
      date: "2023-05-05",
      total: 654.32,
      status: "Pending",
    },
  ]

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase()
      const statusMatches = filters.status.length === 0 || filters.status.includes(order.status)
      const dateMatches =
        (!filters.date.from || new Date(order.date) >= new Date(filters.date.from)) &&
        (!filters.date.to || new Date(order.date) <= new Date(filters.date.to))
      const amountMatches =
        (!filters.amount.min || order.total >= parseFloat(filters.amount.min)) &&
        (!filters.amount.max || order.total <= parseFloat(filters.amount.max))
      return (
        order.id.toLowerCase().includes(searchValue) ||
        order.status.toLowerCase().includes(searchValue) ||
        order.total.toString().includes(searchValue) ||
        (statusMatches && dateMatches && amountMatches)
      )
    })
  }, [search, filters])

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        {/* Header content remains the same */}
      </header>
      <div className="flex-1 overflow-auto">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <DropdownMenuLabel>Filters</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="grid gap-4 p-4">
                  {/* Filter content remains the same */}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => {}}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                    <Badge>
                        {order.status}
                    </Badge>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

interface IconProps extends React.SVGProps<SVGSVGElement> {}

function FilterIcon(props: IconProps): JSX.Element {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

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
  )
}