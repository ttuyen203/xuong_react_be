import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { registerSchema, loginSchema } from "../validations/user.js";

class UserController {
  async registerUser(req, res) {
    try {
      const { email, password } = req.body;
      const { error } = registerSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message);
        return res.status(400).json({ message: errorMessage });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email đã được đăng ký" });
      }

      const hashPassword = await bcryptjs.hash(password, 10);

      const newUser = await User.create({
        email,
        password: hashPassword,
      });

      const newInfo = {
        email: newUser.email,
      };

      return res.status(201).json({ message: "Đăng ký thành công", newInfo });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { error } = loginSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message);
        return res.status(400).json({ message: errorMessage });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Email chưa được đăng ký",
        });
      }

      const isPassword = await bcryptjs.compare(password, user.password);
      if (!isPassword) {
        return res.status(400).json({
          message: "Mật khẩu không chính xác",
        });
      }

      const accessToken = jwt.sign({ userId: user._id }, "hi", {
        expiresIn: "1h",
      });
      const userInfo = {
        email: user.email,
        userId: user._id,
      };
      return res
        .status(200)
        .json({ message: "Đăng nhập thành công", accessToken, userInfo });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default UserController;
