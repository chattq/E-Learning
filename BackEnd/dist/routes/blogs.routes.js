"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogs_controllers_1 = __importDefault(require("../controllers/blogs.controllers"));
const blogs_middlewares_1 = require("../middlewares/blogs.middlewares");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const blogsRouter = (0, express_1.Router)();
blogsRouter.get('/getall', (0, handlers_1.wrapRequestHandler)(blogs_controllers_1.default.getAllBlogs));
blogsRouter.post('/create', blogs_middlewares_1.addNewBlogValidator, users_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(blogs_controllers_1.default.addNewBlog));
blogsRouter.delete('/delete', blogs_middlewares_1.deleteBlogValidator, (0, handlers_1.wrapRequestHandler)(blogs_controllers_1.default.deleteBlog));
exports.default = blogsRouter;
