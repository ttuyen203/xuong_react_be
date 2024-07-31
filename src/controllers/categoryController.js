import Category from "../models/categoryModel.js";

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find({});
      return res.status(200).json({
        message: "Lấy tất cả danh mục thành công",
        data: categories,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async getCategoryDetail(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({
          message: "Không tìm thấy danh mục",
        });
      }
      return res.status(200).json({
        message: "Lấy chi tiết danh mục thành công",
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async createCategory(req, res) {
    try {
      const category = await Category.create(req.body);
      if (!category) {
        return res.status(404).json({
          message: "Không tìm thấy danh mục",
        });
      }
      return res.status(200).json({
        message: "Tạo danh mục thành công",
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async updateCategory(req, res) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!category) {
        return res.status(404).json({
          message: "Không tìm thấy danh mục",
        });
      }
      return res.status(200).json({
        message: "Sửa danh mục thành công",
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async deleteCategory(req, res) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({
          message: "Không tìm thấy danh mục",
        });
      }
      return res.status(200).json({
        message: "Xóa danh mục thành công",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default CategoryController;
