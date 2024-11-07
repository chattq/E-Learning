"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogValidator = exports.addNewBlogValidator = void 0;
const express_validator_1 = require("express-validator");
const blogs_messages_1 = require("../constants/messages-handle/blogs.messages");
const blogs_models_1 = __importDefault(require("../models/blogs.models"));
const validation_1 = require("../utils/validation");
exports.addNewBlogValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    title: {
        notEmpty: {
            errorMessage: blogs_messages_1.BLOGS_MESSAGES.TITLE_IS_REQUIRED // Giả sử bạn có file constants chứa thông báo lỗi
        },
        in: ['body'],
        isString: {
            errorMessage: blogs_messages_1.BLOGS_MESSAGES.TITLE_MUST_BE_A_STRING
        },
        trim: true,
        escape: true
    },
    content: {
        notEmpty: {
            errorMessage: blogs_messages_1.BLOGS_MESSAGES.CONTENT_IS_REQUIRED
        },
        in: ['body'],
        isString: {
            errorMessage: blogs_messages_1.BLOGS_MESSAGES.CONTENT_MUST_BE_A_STRING
        },
        trim: true,
        escape: false
    },
    status: {
        in: ['body'],
        optional: true,
        isIn: {
            options: [['active', 'inactive']],
            errorMessage: blogs_messages_1.BLOGS_MESSAGES.STATUS_IS_INVALID
        }
    },
    blog_image: {
        in: ['body'],
        optional: true,
        isURL: {
            errorMessage: blogs_messages_1.BLOGS_MESSAGES.INVALID_IMAGE_URL
        }
    }
}, ['body']));
exports.deleteBlogValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    blog_id: {
        in: ['body'], // Expecting 'id' to be in request params
        notEmpty: {
            errorMessage: blogs_messages_1.BLOGS_MESSAGES.ID_IS_REQUIRED
        },
        isInt: {
            errorMessage: blogs_messages_1.BLOGS_MESSAGES.ID_MUST_BE_AN_INTEGER,
            options: { min: 1 }
        },
        custom: {
            options: async (value) => {
                const blogs = await blogs_models_1.default.findOne({ where: { blog_id: '1' } });
                console.log(value);
                if (!blogs) {
                    throw new Error(blogs_messages_1.BLOGS_MESSAGES.BLOG_NOT_FOUND);
                }
                return true;
            }
        }
    }
}, ['params']));
