const express = require('express');
const router = express.Router();
const users = require('../resource/db').data.users;

router.use(express.json());


// Define a login route
router.post('/login', (req, res) => {
    console.log(req)
  const { user, password } = req.body; // Extract username and password from request
  
  // Find the user in the stored users array
  const foundUser = users.find(u => u.user === user && u.password === password);

  // Check if the user exists
  if (foundUser) {
    res.status(200).send({ message: 'Login successful', user: foundUser });
  } else {
    res.status(401).send({ message: 'Invalid username or password' });
  }
});

// Export the router module
module.exports = router;
