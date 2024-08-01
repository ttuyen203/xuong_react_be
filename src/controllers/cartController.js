import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

class CartController {
  constructor() {
    this.createCart = this.createCart.bind(this);
    this.updateCart = this.updateCart.bind(this);
  }

  // GET /carts
  async getAllCarts(req, res) {
    try {
      const carts = await Cart.find().populate({
        path: "products",
        populate: {
          path: "product",
          model: Product,
        },
      });
      res.status(200).json(carts);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // GET /carts/:id
  async getCartDetail(req, res) {
    try {
      const cart = await Cart.findById(req.params.id);

      if (!cart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }
      res.status(200).json(cart);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // GET /carts/user/:id
  async getCartUser(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.params.id }).populate({
        path: "products",
        populate: {
          path: "product",
          model: Product,
        },
      });

      // if (!cart) {
      //   return res.status(404).json({ message: "Cart Not Found" });
      // }
      res.status(200).json(cart);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // POST /carts
  async createCart(req, res) {
    try {
      const { quantity, user, product } = req.body;
      const existingCart = await Cart.findOne({ user });

      if (existingCart) {
        // Nếu cart đã tồn tại, gọi hàm updateCart để thêm sản phẩm
        req.params.userId = user; // Set userId param for updateCart
        return this.updateCart(req, res);
      }

      // Nếu cart chưa tồn tại, tạo mới
      const newCart = await Cart.create({
        user,
        products: [
          {
            product,
            quantity,
          },
        ],
      });

      res.status(201).json({
        message: "Add Cart Successful",
        data: newCart,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // PUT /carts/:userId
  async updateCart(req, res) {
    try {
      const { quantity, product } = req.body;
      const cart = await Cart.findOne({ user: req.params.userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }

      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === product
      );

      if (productIndex >= 0) {
        // Update existing product quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.products.push({ product, quantity });
      }

      const updatedCart = await cart.save();

      res.status(200).json({
        message: "Update Cart Successful",
        data: updatedCart,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // DELETE /carts/:userId/products/:id
  async deleteProductCart(req, res) {
    try {
      const { userId, id } = req.params;
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }

      const newProductCart = cart.products.filter(
        (item) => item.product.toString() !== id
      );

      const updatedCart = await Cart.findByIdAndUpdate(
        cart._id,
        { products: newProductCart },
        {
          new: true,
        }
      );

      if (!updatedCart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }

      res.status(200).json({
        message: "Delete Product Cart Successful",
        data: updatedCart,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // DELETE /carts/:id
  async deleteCart(req, res) {
    try {
      const cart = await Cart.findByIdAndDelete(req.params.id);

      if (!cart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }

      res.status(200).json({
        message: "Delete Cart Successful",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default CartController;
