const express = require('express');
const router = express.Router();
const data = require('../resource/db')


let supplierRequests = [];
// Middleware to parse JSON body
router.use(express.json());

// Create a new supplier request and update inventory
router.post('/add', (req, res) => {
  const requestData = req.body.data;
  const inventory = data.data.inventory
  // Calculate total price automatically (if not provided)
  if (!requestData.total_price) {
    requestData.total_price = requestData.quantity * requestData['price/kg'];
  }

  // Auto-increment ID for supplier request
  const lastRequest = supplierRequests[supplierRequests.length - 1];
  const id = lastRequest ? lastRequest.id + 1 : 1;

  const newRequest = {
    id,
    ingredient_name: requestData.ingredient_name,
    quantity: requestData.quantity,
    price_per_kg: requestData['price/kg'],
    total_price: requestData.total_price,
      expiry_date: requestData.expiry_date
  };

  // Push to supplierRequests array
  supplierRequests.push(newRequest);

  // Automatically update inventory if the ingredient exists
  let itemInInventory = inventory.find(item => item.item_name === requestData.ingredient_name);

  if (itemInInventory) {
    itemInInventory.on_hand += requestData.quantity; // Add new quantity to existing inventory
  } else {
    // If item doesn't exist, create a new entry in inventory
    inventory.push({
      id: inventory.length + 1,
      item_name: requestData.ingredient_name,
      expiry_date: requestData.expiry_date, // Set expiry date as null, could be updated later
      on_hand: requestData.quantity
    });
  }

  console.log(newRequest); // Log the request data for debugging
  res.status(201).send({ newRequest, updatedInventory: inventory });
});

module.exports = router;
