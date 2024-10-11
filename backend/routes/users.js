// routes/users.js
const express = require('express');
const router = express.Router();

// Define a route
router.get('/login', (req, res) => {
  const newItem = req.body;

});

// export the router module so that server.js file can use it
module.exports = router;