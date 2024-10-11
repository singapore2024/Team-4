const data = {
  inventory: [
    { id: 1, item_name: 'broccoli', expiry_date: '2024-12-10', on_hand: 10, supplier: "" },
    { id: 2, item_name: 'carrots', expiry_date: '2024-11-15', on_hand: 15, supplier: "" }
  ],
  orders: [
    { id: 1, customer: 'broccoli', date_of_order: '2024-12-10', status: 10, dishes: [{ id: 1, name: "", quantity: 1, price: 100, ingredients: [] }] },
    { id: 2, customer: 'broccoli2', date_of_order: '2024-12-10', status: 10, dishes: [{ id: 1, name: "", quantity: 1, price: 100, ingredients: [] }] }
  ],
  users: [
    { id: 1, user: "aaron", password: "123456" }
  ]
};

module.exports = { data };
