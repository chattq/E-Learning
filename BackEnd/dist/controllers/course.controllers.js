"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_services_1 = __importDefault(require("../services/course.services"));
class CourseController {
    async courseCreate(req, res) {
        const { strJson } = req.body;
        const user_create = req.decoded_authorization?.user_id;
        await course_services_1.default.create(strJson, user_create);
        return res.json({
            isSuccess: true,
            message: 'Create course successful',
            data: null
        });
    }
    async courseGetListCourse(req, res) {
        const results = await course_services_1.default.getListCourse();
        return res.json({
            isSuccess: true,
            message: 'Get list courses successfully',
            data: results
        });
    }
    async GetCourseByCode(req, res) {
        const { CourseCode } = req.body;
        const results = await course_services_1.default.getCourseByCode(CourseCode);
        return res.json({
            isSuccess: true,
            message: 'Get courses successfully',
            data: results
        });
    }
    async DeleteCourseByCode(req, res) {
        const { CourseCode } = req.body;
        await course_services_1.default.deleteCourseByCode(CourseCode);
        return res.json({
            isSuccess: true,
            message: 'Delete courses successfully',
            data: null
        });
    }
}
const courseController = new CourseController();
exports.default = courseController;
