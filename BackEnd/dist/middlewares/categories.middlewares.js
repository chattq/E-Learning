"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesValidator = void 0;
const express_validator_1 = require("express-validator");
const category_models_1 = __importDefault(require("../models/category.models"));
const CheckCondition_1 = require("../utils/CheckCondition");
const Errors_1 = require("../utils/Errors");
const validation_1 = require("../utils/validation");
exports.categoriesValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    strJson: {
        notEmpty: {
            errorMessage: 'Không được để trống'
        },
        in: ['body'],
        custom: {
            options: async (value, { req }) => {
                const dataCategories = JSON.parse(value);
                if ((0, CheckCondition_1.isNullOrUndefined)(dataCategories.CategoryName)) {
                    throw new Errors_1.ErrorWithStatus({ message: 'Tên danh mục không được để trống', status: 200 });
                }
                if (!(0, CheckCondition_1.isNullOrUndefined)(dataCategories.CategoryParentCode)) {
                    const categories = await category_models_1.default.findOne({
                        where: {
                            category_id: dataCategories.CategoryParentCode
                        }
                    });
                    if ((0, CheckCondition_1.isNullOrUndefined)(categories)) {
                        throw new Errors_1.ErrorWithStatus({ message: 'Danh mục cha không tồn tại', status: 200 });
                    }
                    return true;
                }
                return true;
            }
        }
    }
}, ['body']));
