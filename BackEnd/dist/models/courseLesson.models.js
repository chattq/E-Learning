"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const courseChapter_models_1 = __importDefault(require("./courseChapter.models"));
let course_lesson = class course_lesson extends sequelize_typescript_1.Model {
    course_lesson_code;
    course_lesson_name;
    course_lesson_link;
    course_lesson_idx_view;
    course_lesson_attachment;
    course_lesson_nameAttachment;
    course_lesson_Remark;
    course_lesson_LinkVideo;
    course_lesson_nameVideo;
    course_lesson_PublicMode;
    course_chapter_code;
    course_chapter;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(300),
        primaryKey: true
    }),
    __metadata("design:type", String)
], course_lesson.prototype, "course_lesson_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false
    }),
    __metadata("design:type", String)
], course_lesson.prototype, "course_lesson_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT
    }),
    __metadata("design:type", String)
], course_lesson.prototype, "course_lesson_link", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], course_lesson.prototype, "course_lesson_idx_view", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT
    }),
    __metadata("design:type", String)
], course_lesson.prototype, "course_lesson_attachment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT
    }),
    __metadata("design:type", String)
], course_lesson.prototype, "course_lesson_nameAttachment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT
    }),
    __metadata("design:type", String)
], course_lesson.prototype, "course_lesson_Remark", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(300)
    }),
    __metadata("design:type", String)
], course_lesson.prototype, "course_lesson_LinkVideo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(300)
    }),
    __metadata("design:type", String)
], course_lesson.prototype, "course_lesson_nameVideo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('1', '0')
    }),
    __metadata("design:type", String)
], course_lesson.prototype, "course_lesson_PublicMode", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => courseChapter_models_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], course_lesson.prototype, "course_chapter_code", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => courseChapter_models_1.default),
    __metadata("design:type", courseChapter_models_1.default)
], course_lesson.prototype, "course_chapter", void 0);
course_lesson = __decorate([
    sequelize_typescript_1.Table
], course_lesson);
exports.default = course_lesson;
