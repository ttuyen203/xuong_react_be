import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

class OrderController {
  // GET /orders
  async getAllOrders(req, res) {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // GET /orders/:id
  async getOrderDetail(req, res) {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order Not Found" });
      }
      res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // POST /orders
  async createOrder(req, res) {
    try {
      const newOrder = await Order.create(req.body);
      const cart = await Cart.findOneAndDelete({ user: req.body.user });

      if (!cart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }

      res.status(201).json({
        message: "Create Order Successful",
        data: newOrder,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // PUT /orders/:id
  async updateOrder(req, res) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order Not Found" });
      }

      res.status(200).json({
        message: "Update Order Successful",
        data: updatedOrder,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // DELETE /orders/:id
  async deleteOrder(req, res) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order Not Found" });
      }

      res.status(200).json({
        message: "Delete Order Done",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default OrderController;
