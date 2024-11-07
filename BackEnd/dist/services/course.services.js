"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const categoryCourse_models_1 = __importDefault(require("../models/categoryCourse.models"));
const course_models_1 = __importDefault(require("../models/course.models"));
const courseChapter_models_1 = __importDefault(require("../models/courseChapter.models"));
const courseKnowledge_models_1 = __importDefault(require("../models/courseKnowledge.models"));
const courseLesson_models_1 = __importDefault(require("../models/courseLesson.models"));
const courseRequirment_models_1 = __importDefault(require("../models/courseRequirment.models"));
const auto_code_gent_1 = require("../utils/auto-code-gent");
class CoursesService {
    async create(req, user_create) {
        const { autoCodeGen } = (0, auto_code_gent_1.useAutoCodeGen)();
        const courseId = autoCodeGen('COURSE');
        const dataCreate = JSON.parse(req);
        const InforBaseCourse = dataCreate.InforBase;
        const InforContent = dataCreate.InforContent.items.map((item) => {
            return {
                ...item,
                ChapterCode: autoCodeGen('CHAPTER')
            };
        });
        const courseDescription = dataCreate.CourseDescription;
        const dataBaseCourse = {
            course_id: courseId,
            user_id: user_create,
            course_price: InforBaseCourse.CoursePrice,
            course_name: InforBaseCourse.CourseName,
            course_desc: courseDescription.Description,
            course_type: InforBaseCourse.CourseType,
            course_over_view: InforBaseCourse.CourseOverview,
            course_model: InforBaseCourse.CourseModel,
            course_intro_video: InforBaseCourse.VideoIntroCourse,
            course_image: InforBaseCourse.ImageCourse,
            course_create_by: user_create
        };
        const dataCategories = InforBaseCourse.CourseCategory?.map((item) => {
            return {
                category_id: item,
                course_id: courseId
            };
        }) || [];
        const courseRequirement = dataCreate.CourseRequirements.Requirements?.map((item) => {
            return {
                course_requirements_code: autoCodeGen('CRQC'),
                course_requirements_name: item.name,
                course_id: courseId
            };
        }) || [];
        const courseKnowledge = dataCreate.CourseKnowledge.Knowledge?.map((item) => {
            return {
                course_knowledges_code: autoCodeGen('CKLC'),
                course_knowledges_name: item.name,
                course_id: courseId
            };
        }) || [];
        const courseChapter = InforContent.map((item) => {
            return Object.fromEntries(Object.entries(item).filter(([key]) => !key.startsWith('list')));
        }).map((val, index) => {
            return {
                course_chapter_code: val.ChapterCode,
                course_chapter_name: val[`ChapterTitle${index + 1}`],
                course_id: courseId
            };
        });
        const formatData = (data) => {
            const result = [];
            data.forEach((chapter, chapterIdx) => {
                // Tìm chapter code và danh sách tasks
                const chapterCode = chapter.ChapterCode || chapter[`ChapterTitle${chapterIdx + 1}`];
                const listKey = `list${chapterIdx + 1}`;
                // Duyệt qua từng task trong danh sách
                chapter[listKey].forEach((taskObj, taskIdx) => {
                    const task = taskObj[`task${taskIdx + 1}`];
                    // Format lại dữ liệu như yêu cầu
                    result.push({
                        course_lesson_code: autoCodeGen('COLESCODE'),
                        course_chapter_code: chapterCode,
                        course_lesson_name: task.LessonName,
                        course_lesson_PublicMode: task.PublicMode ? '1' : '0',
                        course_lesson_link: task.LinkLesson,
                        course_lesson_LinkVideo: task.LinkVideo.url,
                        course_lesson_nameVideo: task.LinkVideo.name,
                        course_lesson_attachment: task.Attachment.url,
                        course_lesson_nameAttachment: task.Attachment.name,
                        course_lesson_Remark: task.Remark,
                        course_lesson_idx_view: taskIdx + 1 // Số thứ tự của task trong chapter
                    });
                });
            });
            return result;
        };
        const courseLesson = formatData(InforContent);
        await course_models_1.default.create(dataBaseCourse),
            await Promise.all([
                categoryCourse_models_1.default.bulkCreate(dataCategories),
                courseRequirment_models_1.default.bulkCreate(courseRequirement),
                courseKnowledge_models_1.default.bulkCreate(courseKnowledge)
            ]);
        await courseChapter_models_1.default.bulkCreate(courseChapter);
        await courseLesson_models_1.default.bulkCreate(courseLesson);
        return null;
    }
    async getListCourse() {
        const result = await course_models_1.default.findAll();
        return result;
    }
    async getCourseByCode(code) {
        const InforCourse = await course_models_1.default.findOne({
            where: { course_id: code },
            include: [
                {
                    model: courseChapter_models_1.default,
                    include: [courseLesson_models_1.default] // Bao gồm cả Lesson trong Chapter
                },
                {
                    model: courseRequirment_models_1.default
                },
                {
                    model: courseKnowledge_models_1.default
                }
            ]
        });
        return {
            InforCourse: InforCourse
        };
    }
    async deleteCourseByCode(code) {
        // Xóa các lessons liên quan thông qua chapters
        await courseLesson_models_1.default.destroy({
            where: {
                course_chapter_code: {
                    [sequelize_1.Op.in]: (await courseChapter_models_1.default.findAll({ where: { course_id: code } })).map((chapter) => chapter.course_chapter_code)
                    //SELECT * FROM "Courses" WHERE "id" IN (1, 2, 3);
                }
            }
        });
        // Xóa các chapters liên quan
        await courseChapter_models_1.default.destroy({ where: { course_id: code } });
        // Xóa khóa học
        await course_models_1.default.destroy({ where: { course_id: code } });
        return null;
    }
}
const coursesService = new CoursesService();
exports.default = coursesService;
