import Product from "../models/productModel.js";

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.find({}).populate({
        path: "category",
        select: "name -_id",
      });
      return res.status(200).json({
        message: "Lấy tất cả sản phẩm thành công",
        data: products,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async getProductDetail(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: "Không tìm thấy sản phẩm",
        });
      }
      return res.status(200).json({
        message: "Lấy chi tiết sản phẩm thành công",
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async createProduct(req, res) {
    try {
      const product = await Product.create(req.body);
      if (!product) {
        return res.status(404).json({
          message: "Không tìm thấy sản phẩm",
        });
      }
      return res.status(200).json({
        message: "Tạo sản phẩm thành công",
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async updateProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!product) {
        return res.status(404).json({
          message: "Không tìm thấy sản phẩm",
        });
      }
      return res.status(200).json({
        message: "Sửa sản phẩm thành công",
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: "Không tìm thấy sản phẩm",
        });
      }
      return res.status(200).json({
        message: "Xóa sản phẩm thành công",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default ProductController;
