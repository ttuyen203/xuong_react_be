import express from "express";
import ProductController from "../controllers/productController.js";

const router = express.Router();

const productController = new ProductController();

router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductDetail);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

export default router;
