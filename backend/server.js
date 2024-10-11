// server.js
const express = require('express');
const app = express();

// Include route files
const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');
const inventoryRoute = require('./routes/inventory');

// Use routes
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/inventory', inventoryRoute);

const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});