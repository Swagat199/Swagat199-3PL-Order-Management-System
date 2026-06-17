const Order = require("../models/orderModel");

function printOrders() {

    Order.getAllOrders(
        (err, results) => {

            if (err) {
                console.log(err);
                return;
            }

            console.log("\n========== CURRENT ORDERS ==========");

            console.table(results);

            console.log("====================================\n");
        }
    );
}
exports.createOrder = (req, res) => {

  Order.createOrder(
    req.body,
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      console.log("\nNEW ORDER CREATED:");
      console.log(req.body);

      printOrders();

      res.status(201).json({
        message:
          "Order Created Successfully"
      });
    }
  );
};

exports.getAllOrders =
  (req, res) => {

    Order.getAllOrders(
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json(result);
      }
    );
};

exports.getOrderById =
  (req, res) => {

    Order.getOrderById(
      req.params.id,
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json(result);
      }
    );
};

exports.updateOrder =
  (req, res) => {

    Order.updateOrder(
      req.params.id,
      req.body,
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        console.log(`\nORDER UPDATED: ${req.params.id}`);
        console.log(req.body);

        printOrders();
        res.json({
          message:
            "Order Updated Successfully"
        });
      }
    );
};

exports.deleteOrder =
  (req, res) => {

    Order.getOrderById(
      req.params.id,
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        if (
          result[0].status ===
            "Shipped" ||
          result[0].status ===
            "Delivered"
        ) {
          return res.status(400).json({
            message:
              "Cannot delete shipped or delivered orders"
          });
        }

        Order.deleteOrder(
          req.params.id,
          (err) => {

            if (err) {
              return res.status(500).json(err);
            }

            console.log(
           `\nORDER DELETED: ${req.params.id}`
            );

            printOrders();
            res.json({
              message:
                "Order Deleted Successfully"
            });
          }
        );
      }
    );
};
exports.searchOrders =
    (req, res) => {

    const product =
        req.query.product;

    if (!product) {
        return res.status(400)
        .json({
            message:
            "Please enter product name"
        });
    }

    Order.searchOrders(
        product,
        (err, results) => {

            if (err) {
                return res
                .status(500)
                .json({
                    message:
                    "Database Error"
                });
            }

            res.status(200)
            .json(results);

        }
    );
};