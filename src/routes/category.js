import express from "express";
import CategoryController from "../controllers/categoryController.js";

const router = express.Router();

const categoryController = new CategoryController();

router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryDetail);
router.post("/categories", categoryController.createCategory);
router.put("/categories/:id", categoryController.updateCategory);
router.delete("/categories/:id", categoryController.deleteCategory);

export default router;
