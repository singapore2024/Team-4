// routes/inventory.js
// import data from '../resource/db';
const data = require('../resource/db');
const express = require('express');
const router = express.Router();

router.use(express.json());

// Accept an order by ID and deduct inventory
router.post('/:id/accept', (req, res) => {
  const orders = data.data.orders;
  const inventory = data.data.inventory;
  const order = orders.find(o => o.id === parseInt(req.params.id)); // Find the order by ID

  if (!order) return res.status(404).send('Order not found');

  // Deduct ingredients from inventory when the order is accepted
  order.dish.forEach(dish => {
    dish.ingredients.forEach(ingredient => {
      const inventoryItem = inventory.find(item => item.item_name === ingredient.ingredient_name);
      if (inventoryItem) {
        // Deduct quantity from inventory
        inventoryItem.on_hand -= ingredient.quantity;
        if (inventoryItem.on_hand < 0) {
          return res.status(400).send(`Not enough ${ingredient.ingredient_name} in stock`);
        }
      } else {
        return res.status(400).send(`${ingredient.ingredient_name} not found in inventory`);
      }
    });
  });

  // Mark order as accepted
  order.status = 'Approved';
  res.status(200).send({ message: 'Order accepted and inventory updated', order });
});


router.post('/add', (req, res) => {
  const orders = data.data.orders;
  const newOrder = req.body.data;

  // Auto-increment ID based on the last order's ID
  const lastOrder = orders[orders.length - 1];
  newOrder.id = lastOrder ? lastOrder.id + 1 : 1; // Set ID as 1 if no orders exist

  orders.push(newOrder); // Add new order to the orders array
  res.status(201).send(newOrder); // Return the newly added order
});


// Read - Get all inventory items
router.get('/all', (req, res) => {
  const orders = data.data.orders;
  res.status(200).json(orders); // Return all orders
});


// Read - Get a specific item by ID
router.get('/:id', (req, res) => {
  const orders = data.data.orders;
  const order = orders.find(o => o.id === parseInt(req.params.id)); // Find by ID

  if (!order) return res.status(404).send('Order not found'); // If not found
  res.status(200).send(order); // Return the specific order
});


// Delete - Remove an item by ID
router.delete('/:id', (req, res) => {
  const orders = data.data.orders;
  const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id)); // Find by ID

  if (orderIndex === -1) return res.status(404).send('Order not found'); // If not found
  const removedOrder = orders.splice(orderIndex, 1); // Remove the order
  res.status(200).send(removedOrder); // Return the removed order
});


module.exports = router;
