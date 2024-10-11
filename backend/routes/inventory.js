// routes/inventory.js

const data = require('../resource/db')
const express = require('express');
const router = express.Router();

router.use(express.json());


// Create - Add a new inventory item
router.post('/add', (req, res) => {
  const newItem = req.body.data;
  const inventory = data.data.inventory
  // Auto-increment ID based on the last item's ID
  const lastItem = inventory[inventory.length - 1];
  newItem.id = lastItem ? lastItem.id + 1 : 1;

  inventory.push(newItem);
  console.log(newItem);
  res.status(201).send(newItem);
});

// Read - Get all inventory items
router.get('/all', (req, res) => {
  const inventory = data.data.inventory

  res.status(200).json(inventory);
});

// Read - Get a specific item by ID
router.get('/:id', (req, res) => {
  const inventory = data.data.inventory

  const item = inventory.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.status(200).send(item);
});

// Delete - Remove an item by ID
router.delete('/:id', (req, res) => {
  const inventory = data.data.inventory

  const itemIndex = inventory.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('Item not found');
  const removedItem = inventory.splice(itemIndex, 1);
  res.status(200).send(removedItem);
});

module.exports = router;
