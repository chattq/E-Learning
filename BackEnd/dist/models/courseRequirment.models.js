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
let course_requirement = class course_requirement extends sequelize_typescript_1.Model {
    course_requirements_name;
    // khóa ngoại
    course_id;
    // // mối liên hệ với bảng
    course; // tham chiếu đến bảng
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(300),
        primaryKey: true
    }),
    __metadata("design:type", String)
], course_requirement.prototype, "course_requirements_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false
    }),
    __metadata("design:type", String)
], course_requirement.prototype, "course_requirements_name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => course_models_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], course_requirement.prototype, "course_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => course_models_1.default, { foreignKey: 'course_id', onDelete: 'CASCADE' }),
    __metadata("design:type", course_models_1.default // tham chiếu đến bảng
    )
], course_requirement.prototype, "course", void 0);
course_requirement = __decorate([
    sequelize_typescript_1.Table
], course_requirement);
exports.default = course_requirement;
