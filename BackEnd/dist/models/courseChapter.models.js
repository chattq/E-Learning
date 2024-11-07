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
const course_models_1 = __importDefault(require("./course.models"));
const courseLesson_models_1 = __importDefault(require("./courseLesson.models"));
let course_chapter = class course_chapter extends sequelize_typescript_1.Model {
    course_chapter_code;
    course_chapter_name;
    course_id;
    course;
    course_lesson;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(300),
        primaryKey: true
    }),
    __metadata("design:type", String)
], course_chapter.prototype, "course_chapter_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false
    }),
    __metadata("design:type", String)
], course_chapter.prototype, "course_chapter_name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_models_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], course_chapter.prototype, "course_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_models_1.default, { foreignKey: 'course_id', onDelete: 'CASCADE' }),
    __metadata("design:type", course_models_1.default)
], course_chapter.prototype, "course", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => courseLesson_models_1.default, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], course_chapter.prototype, "course_lesson", void 0);
course_chapter = __decorate([
    sequelize_typescript_1.Table
], course_chapter);
exports.default = course_chapter;
