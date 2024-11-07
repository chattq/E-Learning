"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const medias_routes_1 = __importDefault(require("./routes/medias.routes"));
const categories_routes_1 = __importDefault(require("./routes/categories.routes"));
const blogs_routes_1 = __importDefault(require("./routes/blogs.routes"));
const account_bank_routes_1 = __importDefault(require("./routes/account_bank.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const router = (0, express_1.Router)();
router.use('/users', users_routes_1.default);
router.use('/course', course_routes_1.default);
router.use('/medias', medias_routes_1.default);
router.use('/AdCategories', categories_routes_1.default);
router.use('/blogs', blogs_routes_1.default);
router.use('/AccountBank', account_bank_routes_1.default);
exports.default = router;
