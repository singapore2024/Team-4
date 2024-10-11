// server.js
const express = require("express");
const app = express();

// Include route files
const usersRoute = require("./routes/users");
const inventoryRoute = require("./routes/inventory");
const orderRoute = require("./routes/orders");
const supplierRoute = require("./routes/supplier");

// Use routes
app.use("/users", usersRoute);
app.use("/inventory", inventoryRoute);
app.use("/orders", orderRoute);
app.use("/suppliers", supplierRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
