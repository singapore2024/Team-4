const data = {
  inventory: [
    {
      id: 1,
      item_name: "broccoli",
      expiry_date: "2024-12-10",
      on_hand: 10,
    },
    {
      id: 2,
      item_name: "fish",
      expiry_date: "2024-11-15",
      on_hand: 15,
    },
  ],
  orders: [
    {
      id: 1,
      customer: "cust1",
      date_of_order: "2024-12-10",
      status: 1, // Order accepted status
      dish: [
        {
          id: 1,
          name: "Broccoli Soup",
          quantity: 1,
          price: 100,
          ingredients: [
            {
              ingredient_name: "broccoli",
              quantity: 2,
            },
          ],
          allergens: [],
        },
      ],
    },
    {
      id: 2,
      customer: "cust2",
      date_of_order: "2024-12-10",
      status: 0, // Pending order
      dish: [
        {
          id: 1,
          name: "Fish Soup",
          quantity: 1,
          price: 100,
          ingredients: [
            {
              ingredient_name: "fish",
              quantity: 1,
            },
          ],
          allergens: [],
        },
      ],
    },
  ],
  users: [{ id: 1, user: "aaron", password: "123456" }],
  store_config: {
    daily_capacity: 100,
  },
  recipes: [
    {
      name: "grilled vegetables",
      ingredients: ["broccoli"],
      last_chosen: "2024-02-10",
    },
    {
      name: "chicken rice",
      ingredients: ["chicken", "rice"],
    },
  ],
  generated_recipes: [
    {
      name: "brownie",
      ingredients: ["broccoli"],
      last_chosen: "2024-02-10",
    },
    {
      name: "fish and chips",
      ingredients: ["fish", "potato"],
      last_chosen: "2024-02-10",
    },
  ],
  suppliers: [
    {
      id: 1,
      item_name: "broccoli",
      name: "supplier1",
      quantity: 20,
      amount: 20,
      price: 30,
    },
    {
      id: 2,
      item_name: "carrots",
      name: "supplier2",
      quantity: 20,
      amount: 20,
      price: 30,
    },
  ],
};

module.exports = { data };
