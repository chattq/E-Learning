"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_models_1 = __importDefault(require("../models/category.models"));
const categories_services_1 = __importDefault(require("../services/categories.services"));
class CategoryController {
    async categoryCreate(req, res) {
        const { strJson } = req.body;
        const user_create = req.decoded_authorization?.user_id;
        await categories_services_1.default.create(strJson, user_create);
        return res.json({
            isSuccess: true,
            message: 'Create category successful',
            data: null
        });
    }
    async categoryGetAllActive(req, res) {
        const result = await category_models_1.default.findAll();
        return res.json({
            isSuccess: true,
            message: 'Get category successful',
            data: result?.map((val) => {
                const { category_id, category_name, category_desc, category_total_course, category_parent_code, category_active, category_create_by, category_create_at, category_update_at } = val.dataValues;
                return {
                    CategoryCode: category_id,
                    CategoryName: category_name,
                    CategoryDesc: category_desc,
                    FlagActive: category_active,
                    CategoryParentCode: category_parent_code,
                    CreatedBy: category_create_by,
                    CreatedDate: category_create_at,
                    UpdatedDate: category_update_at
                };
            }) || []
        });
    }
}
const categoryController = new CategoryController();
exports.default = categoryController;
