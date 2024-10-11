const data = {
  inventory: [
    {
      id: 1,
      item_name: "broccoli",
      expiry_date: "2024-12-10",
      on_hand: 10,
      supplier: "",
    },
    {
      id: 2,
      item_name: "carrots",
      expiry_date: "2024-11-15",
      on_hand: 15,
      supplier: "",
    },
  ],
  orders: [
    {
      id: 1,
      customer: "cust1",
      date_of_order: "2024-12-10",
      status: 1,
      dish: [
        {
          id: 1,
          name: "",
          quantity: 10,
          price: 100,
          ingredients: [],
          allergens: [],
        },
      ],
    },
    {
      id: 2,
      customer: "cust2",
      date_of_order: "2024-12-10",
      status: 0,
      dish: [
        {
          id: 1,
          name: "",
          quantity: 10,
          price: 100,
          ingredients: [],
          allergens: [],
        },
      ],
    },
    {
      id: 3,
      customer: "cust3",
      date_of_order: "2024-12-10",
      status: 0,
      dish: [
        {
          id: 1,
          name: "",
          quantity: 10,
          price: 100,
          ingredients: [],
          allergens: ["carrots"],
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
      ingredients: ["brocoli"],
      last_chosen: "2024-02-10",
    },
    { name: "chicken rice", ingredients: ["chicken", "rice"] },
  ],
  generated_recipes: [
    { name: "brownie", ingredients: ["brocoli"], last_chosen: "2024-02-10" },
    {
      name: "fish and chips",
      ingredients: ["fish", "potato"],
      last_chosen: "2024-02-10",
    },
  ],
  suppliers : [
    { id: 1, item_name: 'broccoli', name: "supplier1", quantity: 20, amount: 20},
    { id: 2, item_name: 'carrots', name: "supplier2" , quantity: 20, amount: 20}
  ]
};

module.exports = { data };
