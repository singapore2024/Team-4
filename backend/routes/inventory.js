// routes/inventory.js
const express = require('express');
const router = express.Router();

// Sample inventory data
let inventory = [
  { id: 1, item_name: 'broccoli', expiry_date: '2024-12-10', on_hand: 10, supplier: "" },
  { id: 2, item_name: 'carrots', expiry_date: '2024-11-15', on_hand: 15, supplier: ""}
];

// Create - Add a new inventory item
router.post('/add', (req, res) => {
  const newItem = req.body;

  // Auto-increment ID based on the last item's ID
  const lastItem = inventory[inventory.length - 1];
  newItem.id = lastItem ? lastItem.id + 1 : 1; // Set id as 1 if inventory is empty

  inventory.push(newItem);
  console.log(newItem); // Log the new item to the console
  res.status(201).send(newItem);
});

// Read - Get all inventory items
router.get('/all', (req, res) => {
  res.status(200).json(inventory);
});

// Read - Get a specific item by ID
router.get('/:id', (req, res) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.status(200).send(item);
});

// Delete - Remove an item by ID
router.delete('/:id', (req, res) => {
  const itemIndex = inventory.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('Item not found');
  const removedItem = inventory.splice(itemIndex, 1);
  res.status(200).send(removedItem);
});

module.exports = router;
