import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "../ui/badge"

// Sample data for demonstration
const ingredientData = [
  { name: "Flour", quantity: 10, price: 2.5, inventory: 50, toOrder: 20 },
  { name: "Sugar", quantity: 5, price: 1.8, inventory: 30, toOrder: 10 },
  { name: "Eggs", quantity: 24, price: 0.25, inventory: 100, toOrder: 0 },
  { name: "Milk", quantity: 4, price: 3.2, inventory: 20, toOrder: 5 },
  { name: "Butter", quantity: 2, price: 4.5, inventory: 15, toOrder: 5 },
]

export default function OrdersDetailsCard() {
    // TODO: Add current inventory to log
    // TODO: Take in order status
    // Display main info on top
    // Display table with the following columns -> ingredient name, quantity, price, total price, inventory amount, amount to order
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Ingredient Details</CardTitle>
                <div className="flex flex-row justify-between">
                    <p className="text-muted-foreground">
                        Total Ingredients: {ingredientData.length}
                    </p>
                    <div className="flex items-center space-x-2">
                        {/* Status text and badge */}
                        <span>Status:</span>
                        <Badge>Pending</Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[180px]">Ingredient Name</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-center">Price</TableHead>
                            <TableHead className="text-center">Total Price</TableHead>
                            <TableHead className="text-center">Inventory Amount</TableHead>
                            <TableHead className="text-center">Amount to Order</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ingredientData.map((ingredient, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{ingredient.name}</TableCell>
                                <TableCell className="text-center">{ingredient.quantity}</TableCell>
                                <TableCell className="text-center">${ingredient.price.toFixed(2)}</TableCell>
                                <TableCell className="text-center">${(ingredient.quantity * ingredient.price).toFixed(2)}</TableCell>
                                <TableCell className="text-center">{ingredient.inventory}</TableCell>
                                <TableCell className={`text-center ${ingredient.toOrder > 0 ? "text-red-500" : ""}`}>
                                {ingredient.toOrder}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
        </Card>   
    )
}