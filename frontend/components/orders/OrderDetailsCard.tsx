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
import { Button } from "../ui/button";
import { useOrdersStore } from "@/store/OrdersState";

// Sample data for demonstration
// const ingredientData = [
//   { name: "Flour", quantity: 10, price: 2.5, inventory: 50, toOrder: 20 },
//   { name: "Sugar", quantity: 5, price: 1.8, inventory: 30, toOrder: 10 },
//   { name: "Eggs", quantity: 24, price: 0.25, inventory: 100, toOrder: 0 },
//   { name: "Milk", quantity: 4, price: 3.2, inventory: 20, toOrder: 5 },
//   { name: "Butter", quantity: 2, price: 4.5, inventory: 15, toOrder: 5 },
// ]

interface Ingredient {
  ingredient_name: string;
  quantity: number;
  price: number;
}

interface Dish {
  id: number;
  name: string;
  quantity: number;
  price: number;
  ingredients: Ingredient[];
  allergens: string[];
}

interface Order {
  id: number;
  customer: string;
  date_of_order: string;
  status: string;
  dish: Dish[];
}

interface OrderDetailsCardProps {
    order: Order;
    inventory: Record<string, number>;
}

export default function OrdersDetailsCard( { order, inventory } : OrderDetailsCardProps) {
    // TODO: Add current inventory to log
    // TODO: Take in order status
    const ordersState = useOrdersStore((state) => state.orders);
    console.log("orders");
    console.log(ordersState);
    const { addOrder, clearOrders } = useOrdersStore((state) => state);

    // Display main info on top
    // Display table with the following columns -> ingredient name, quantity, price, total price, inventory amount, amount to order
    
    const handleConfirm = () => {
        // add orders from ingredientsData to orderState
        for  (const ingredient of ingredientsData) {
            let order  = {
                ingredient_name : ingredient.name,
                quantity: ingredient.toOrder,
                price: ingredient.price,
                total_price: ingredient.price * ingredient.toOrder
            }
            addOrder(order);
        }
    }

    const handleReset = () => {
clearOrders();
    }
    const ingredientsData = order.dish.flatMap(dish => {
        return dish.ingredients.map(ingredient => {
            const currentInventory = inventory[ingredient.ingredient_name] || 0; // Get current inventory or default to 0
            const remainingQuantity = currentInventory - ingredient.quantity; // Calculate remaining quantity
            
            return {
                name: ingredient.ingredient_name,
                quantity: ingredient.quantity, // You may need to multiply by dish.quantity if needed
                price: ingredient.price, // Assuming price is included in each ingredient
                inventory: currentInventory, // Use current inventory
                toOrder: remainingQuantity > 0 ? 0 : Math.abs(remainingQuantity), // Set to 0 if remaining is positive, otherwise use absolute value
            };
        });
    });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Ingredient Details</CardTitle>
        <div className="flex flex-row justify-between">
          <p className="text-muted-foreground">
            Total Ingredients: {ingredientsData.length}
          </p>
          <div className="flex items-center space-x-2">
            {/* Status text and badge */}
            <span>Status:</span>
            <Badge>{order.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto mb-8">
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
              {ingredientsData.map((ingredient, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell className="text-center">{ingredient.quantity}</TableCell>
                  <TableCell className="text-center">${ingredient.price}</TableCell>
                  <TableCell className="text-center">${(ingredient.quantity * ingredient.price).toFixed(2)}</TableCell>
                  <TableCell className="text-center">{ingredient.inventory}</TableCell>
                  <TableCell className={`text-center ${ingredient.toOrder < 0 ? "text-red-500" : ""}`}>
                    {Math.abs(ingredient.toOrder)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button onClick={handleConfirm}>Confirm Order</Button>
        <Button onClick={handleReset}>Reset</Button>
      </CardContent>
    </Card>
    )
}