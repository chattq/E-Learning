"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const blogs_models_1 = __importDefault(require("../models/blogs.models"));
const useGetTime_1 = require("../utils/useGetTime");
const { getTimeMoment } = (0, useGetTime_1.useGetTime)();
(0, dotenv_1.config)();
class BlogService {
    async BlogAddNew(payload) {
        const { title, content, blog_image } = payload;
        const dataCreateBlog = {
            blog_title: title,
            blog_content: content,
            image_url: blog_image,
            blog_author: 'Tuệ'
        };
        console.log(blog_image);
        await blogs_models_1.default.create(dataCreateBlog);
        return { message: 'success' };
    }
    // Xóa blog theo ID
    async BlogDelete(blogId) {
        console.log('blogId', blogId);
        const blogToDelete = await blogs_models_1.default.findOne({ where: { blog_id: blogId.blog_id } });
        if (!blogToDelete) {
            return { message: 'Blog not found', success: false };
        }
        await blogToDelete.destroy();
        return { message: 'Blog deleted successfully', success: true };
    }
}
const blogService = new BlogService();
exports.default = blogService;
