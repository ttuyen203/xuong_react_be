import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),
  password: Joi.string().required().min(6).max(20).messages({
    "string.empty": "Mật khẩu không được để trống",
    "string.min": "Mật khẩu tối thiểu là 6 kí tự",
    "string.max": "Mật khẩu tối đa là 20 kí tự",
    "any.required": "Mật khẩu là bắt buộc",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
  }),
  password: Joi.string().required().min(6).max(20).messages({
    "string.empty": "Mật khẩu không được để trống",
    "string.min": "Mật khẩu tối thiểu là 6 kí tự",
    "string.max": "Mật khẩu tối đa là 20 kí tự",
    "any.required": "Mật khẩu là bắt buộc",
  }),
});
