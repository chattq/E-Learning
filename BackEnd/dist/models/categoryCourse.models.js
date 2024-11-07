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
const category_models_1 = __importDefault(require("./category.models"));
let course_category = class course_category extends sequelize_typescript_1.Model {
    category_id;
    course_id;
};
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_models_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", String)
], course_category.prototype, "category_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_models_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", String)
], course_category.prototype, "course_id", void 0);
course_category = __decorate([
    sequelize_typescript_1.Table
], course_category);
exports.default = course_category;
