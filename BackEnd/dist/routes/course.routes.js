"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controllers_1 = __importDefault(require("../controllers/course.controllers"));
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const coursesRouter = (0, express_1.Router)();
coursesRouter.post('/create', users_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(course_controllers_1.default.courseCreate));
coursesRouter.post('/GetListCourse', users_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(course_controllers_1.default.courseGetListCourse));
coursesRouter.post('/GetCourseByCode', users_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(course_controllers_1.default.GetCourseByCode));
coursesRouter.post('/Delete', users_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(course_controllers_1.default.DeleteCourseByCode));
exports.default = coursesRouter;
