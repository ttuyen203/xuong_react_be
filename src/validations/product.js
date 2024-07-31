import Joi from "joi";

export const productCreateSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Tên sản phẩm không được để trống",
    "any.required": "Tên sản phẩm là bắt buộc",
  }),
  image: Joi.string().required().messages({
    "string.empty": "Ảnh sản phẩm không được để trống",
    "any.required": "Ảnh sản phẩm là bắt buộc",
  }),
  price: Joi.number().required().messages({
    "number.base": "Giá sản phẩm phải là số",
    "any.required": "Giá sản phẩm là bắt buộc",
  }),
  quantity: Joi.number().integer().required().messages({
    "number.base": "Số lượng sản phẩm phải là số",
    "any.required": "Số lượng sản phẩm là bắt buộc",
    "number.integer": "Số lượng sản phẩm phải là số nguyên",
  }),
  desc: Joi.string().required().messages({
    "string.empty": "Mô tả sản phẩm không được để trống",
    "any.required": "Mô tả sản phẩm là bắt buộc",
  }),
  rate: Joi.number().min(1).max(5).optional().messages({
    "number.base": "Rate phải là số",
    "number.min": "Đánh giá tối thiểu là 1",
    "number.max": "Đánh giá tối đa là 5",
  }),
});

export const productUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  image: Joi.string().optional(),
  price: Joi.number().optional(),
  quantity: Joi.number().integer().optional(),
  desc: Joi.string().optional(),
  rate: Joi.number().min(1).max(5).optional().messages({
    "number.min": "Đánh giá tối thiểu là 1",
    "number.max": "Đánh giá tối đa là 5",
  }),
}).min(1);
