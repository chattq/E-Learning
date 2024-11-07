"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controllers_1 = __importDefault(require("../controllers/categories.controllers"));
const categories_middlewares_1 = require("../middlewares/categories.middlewares");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const categoriesRouter = (0, express_1.Router)();
/**
 * Description: tạo mới ngành hàng
 * Path: /AdCategories/create
 * Method: Post
 * Header:
 * Body: strJson
 */
categoriesRouter.post('/create', users_middlewares_1.accessTokenValidator, categories_middlewares_1.categoriesValidator, (0, handlers_1.wrapRequestHandler)(categories_controllers_1.default.categoryCreate));
/**
 * Description: lấy tất cả categories active
 * Path: /AdCategories/getAllActive
 * Method: Post
 * Header:
 * Body:
 */
categoriesRouter.post('/getAllActive', users_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(categories_controllers_1.default.categoryGetAllActive));
exports.default = categoriesRouter;
