const db = require("../config/db");

const Order = {

  createOrder: (data, callback) => {
    const sql =
      `INSERT INTO orders
      (customer_id,
      product_name,
      quantity,
      delivery_address,
      order_date,
      delivery_date,
      status)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [
        data.customer_id,
        data.product_name,
        data.quantity,
        data.delivery_address,
        data.order_date,
        data.delivery_date,
        data.status
      ],
      callback
    );
  },

  getAllOrders: (callback) => {
    const sql = `
    SELECT
    o.order_id,
    c.company_name,
    o.product_name,
    o.quantity,
    o.delivery_address,
    o.order_date,
    o.delivery_date,
    o.status
    FROM orders o
    JOIN customers c
    ON o.customer_id = c.customer_id `;

    db.query(sql, callback);
  },

  getOrderById: (id, callback) => {
    const sql = `
    SELECT *
    FROM orders
    WHERE order_id=?
    `;

    db.query(sql, [id], callback);
  },

  updateOrder: (id, data, callback) => {
    const sql = `
    UPDATE orders
    SET
    product_name=?,
    quantity=?,
    delivery_address=?,
    delivery_date=?,
    status=?
    WHERE order_id=?
    `;

    db.query(
      sql,
      [
        data.product_name,
        data.quantity,
        data.delivery_address,
        data.delivery_date,
        data.status,
        id
      ],
      callback
    );
  },

  deleteOrder: (id, callback) => {
    const sql =
      "DELETE FROM orders WHERE order_id=?";

    db.query(sql, [id], callback);
  },


  searchOrders : (product,callback) => {
    const sql = `
        SELECT *
        FROM orders
        WHERE product_name LIKE ?
    `;

    db.query(
        sql,
        [`%${product}%`],
        callback
    );
},

};

module.exports = Order;