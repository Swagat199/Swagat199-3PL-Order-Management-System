const validStatus = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled"
];

exports.validateOrder = (req, res, next) => {

  const {
    quantity,
    order_date,
    delivery_date,
    status
  } = req.body;

  if (quantity <= 0) {
    return res.status(400).json({
      message:
        "Quantity must be greater than zero"
    });
  }

  if (
    new Date(delivery_date) <
    new Date(order_date)
  ) {
    return res.status(400).json({
      message:
        "Delivery date cannot be before order date"
    });
  }

  if (!validStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid Status"
    });
  }

  next();
};