import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./src/routes/product.js";
import categoryRouter from "./src/routes/category.js";
import userRouter from "./src/routes/user.js";
import cartRouter from "./src/routes/carts.js";
import orderRouter from "./src/routes/orders.js";

// Tạo ứng dụng Express
const app = express();

// Tải các biến môi trường từ file .env vào biến process.env
dotenv.config();

// Thiết lập cổng cho ứng dụng
const port = process.env.PORT || 3000;

// Middleware để phân tích các yêu cầu URL-encoded (dữ liệu gửi từ form HTML)
app.use(
  express.urlencoded({
    extended: true, // Cho phép phân tích các đối tượng phức tạp
  })
);

// Middleware để phân tích các yêu cầu JSON (dữ liệu gửi dưới dạng JSON)
app.use(express.json());

// Middleware để cho phép yêu cầu từ các nguồn khác nhau (CORS - Cross-Origin Resource Sharing)
app.use(cors());

// Sử dụng các route được định nghĩa trong productRouter cho ứng dụng
app.use(productRouter);

// Sử dụng các route được định nghĩa trong categoryRouter cho ứng dụng
app.use(categoryRouter);

// Sử dụng các route được định nghĩa trong userRouter cho ứng dụng
app.use(userRouter);

app.use(cartRouter);
app.use(orderRouter);

// Kết nối tới MongoDB sử dụng URL từ biến môi trường DB_URL
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Kết nối thành công!");
  })
  .catch(() => {
    console.log("Kết nối thất bại!");
  });

app.listen(port, () => {
  console.log(`Máy chủ đang chạy trên cổng ${port}`);
});
