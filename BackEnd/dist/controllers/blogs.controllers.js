"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogs_models_1 = __importDefault(require("../models/blogs.models"));
const blogs_services_1 = __importDefault(require("../services/blogs.services"));
const results_api_1 = require("../utils/results-api");
class BlogController {
    // Lấy tất cả các bài blog
    async getAllBlogs(req, res) {
        try {
            const blogs = await blogs_models_1.default.findAll();
            return res.status(200).json({
                isSuccess: true,
                message: 'Blog get all successful',
                data: { blogs }
            });
        }
        catch (error) {
            let errorMessage = 'Có lỗi xảy ra khi lấy dữ liệu blog';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return res.status(500).json({
                success: false,
                message: errorMessage
            });
        }
    }
    // Thêm blog mới
    async addNewBlog(req, res) {
        const result = await blogs_services_1.default.BlogAddNew(req.body);
        return res.json(new results_api_1.ResultsReturned({
            isSuccess: true,
            message: 'Blog create successful',
            data: { result }
        }));
    }
    // Xóa blog
    async deleteBlog(req, res) {
        console.log('req', req);
        const { id } = req.params;
        const result = await blogs_services_1.default.BlogDelete(req.body);
        return res.json(new results_api_1.ResultsReturned({
            isSuccess: true,
            message: result.message,
            data: null
        }));
    }
}
const blogController = new BlogController();
exports.default = blogController;
