"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_models_1 = __importDefault(require("../models/category.models"));
const auto_code_gent_1 = require("../utils/auto-code-gent");
class CategoriesService {
    async create(req, user_create) {
        const { autoCodeGen } = (0, auto_code_gent_1.useAutoCodeGen)();
        const dataCreate = JSON.parse(req);
        dataCreate.CreatedBy = user_create;
        dataCreate.CategoryCode = autoCodeGen('CTGRCODE');
        await category_models_1.default.create({
            category_id: dataCreate.CategoryCode,
            category_name: dataCreate.CategoryName,
            category_desc: dataCreate.CategoryDesc,
            category_parent_code: dataCreate.CategoryParentCode,
            category_active: dataCreate.FlagActive,
            category_create_by: dataCreate.CreatedBy
        });
        return null;
    }
}
const categoriesService = new CategoriesService();
exports.default = categoriesService;
