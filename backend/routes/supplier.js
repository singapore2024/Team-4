const express = require('express');
const router = express.Router();
const data = require('../resource/db')


let supplierRequests = [];
// Middleware to parse JSON body
router.use(express.json());

router.get('/', (req, res) => {
  const supplierData = data.data.suppliers; // Access the supplier data
  res.status(200).json(supplierData); // Return the supplier data as JSON
});


// Create a new supplier request and update inventory
router.post('/add', (req, res) => {
  const requestData = req.body.data; // inventories
  const inventory = data.data.inventory
    for (let i = 0; i < requestData.length; i++) {
        // Calculate total price automatically (if not provided)
        let current_req = requestData[i]
      if (!current_req.total_price) {
        current_req.total_price = current_req.quantity * current_req['price/kg'];
      }

      // Auto-increment ID for supplier request
      const lastRequest = supplierRequests[supplierRequests.length - 1];
      const id = lastRequest ? lastRequest.id + 1 : 1;

      // Push to supplierRequests array
      // supplierRequests.push(newRequest);

      // Automatically update inventory if the ingredient exists
      let itemInInventory = inventory.find(item => item.item_name === current_req.ingredient_name);

      if (itemInInventory) {
        itemInInventory.on_hand += current_req.quantity; // Add new quantity to existing inventory
      } else {
        // If item doesn't exist, create a new entry in inventory
        inventory.push({
          id: inventory.length + 1,
          item_name: current_req.ingredient_name,
          expiry_date: current_req.expiry_date, // Set expiry date as null, could be updated later
          on_hand: current_req.quantity
        });
      }
    }


  // console.log(newRequest); // Log the request data for debugging
  res.status(201).send({ updatedInventory: inventory });
});

module.exports = router;
