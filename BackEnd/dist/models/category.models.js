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
const categoryCourse_models_1 = __importDefault(require("./categoryCourse.models"));
const course_models_1 = __importDefault(require("./course.models"));
let category = class category extends sequelize_typescript_1.Model {
    category_id;
    course_id;
    category_name;
    category_desc;
    category_total_course;
    category_active;
    category_parent_code;
    category_create_by;
    category_create_at;
    category_update_at;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        primaryKey: true
    }),
    __metadata("design:type", String)
], category.prototype, "category_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], category.prototype, "course_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(150),
        unique: true,
        allowNull: false
    }),
    __metadata("design:type", String)
], category.prototype, "category_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200)
    }),
    __metadata("design:type", String)
], category.prototype, "category_desc", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", String)
], category.prototype, "category_total_course", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        defaultValue: '1'
    }),
    __metadata("design:type", String)
], category.prototype, "category_active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], category.prototype, "category_parent_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], category.prototype, "category_create_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], category.prototype, "category_create_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], category.prototype, "category_update_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => course_models_1.default, () => categoryCourse_models_1.default),
    __metadata("design:type", Array)
], category.prototype, "courses", void 0);
category = __decorate([
    sequelize_typescript_1.Table
], category);
exports.default = category;
