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
const category_models_1 = __importDefault(require("./category.models"));
const categoryCourse_models_1 = __importDefault(require("./categoryCourse.models"));
const user_models_1 = __importDefault(require("./user.models"));
const promotionCombo_models_1 = __importDefault(require("./promotionCombo.models"));
const comboCourse_models_1 = __importDefault(require("./comboCourse.models"));
const buyer_models_1 = __importDefault(require("./buyer.models"));
const courseRequirment_models_1 = __importDefault(require("./courseRequirment.models"));
const courseKnowledge_models_1 = __importDefault(require("./courseKnowledge.models"));
const courseChapter_models_1 = __importDefault(require("./courseChapter.models"));
let course = class course extends sequelize_typescript_1.Model {
    course_id;
    user_id;
    users; // declare user: Users: Khai báo thuộc tính users sẽ chứa đối tượng User liên quan.
    course_price;
    course_discount;
    course_name;
    course_desc;
    course_type;
    course_model;
    course_over_view;
    course_rate;
    course_number_buyers;
    course_active;
    course_comming_soon;
    course_intro_video;
    course_image;
    course_create_by;
    course_update_by;
    course_create_at;
    course_update_at;
    buyer_courses;
    course_requirement;
    course_knowledge;
    course_chapter;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        primaryKey: true
    }),
    __metadata("design:type", String)
], course.prototype, "course_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_models_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], course.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_models_1.default, { foreignKey: 'user_id', onDelete: 'CASCADE' }),
    __metadata("design:type", user_models_1.default // declare user: Users: Khai báo thuộc tính users sẽ chứa đối tượng User liên quan.
    )
], course.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(18, 2)
    }),
    __metadata("design:type", Number)
], course.prototype, "course_price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(18, 2)
    }),
    __metadata("design:type", Number)
], course.prototype, "course_discount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(150),
        allowNull: false
    }),
    __metadata("design:type", String)
], course.prototype, "course_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(500)
    }),
    __metadata("design:type", String)
], course.prototype, "course_desc", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20)
    }),
    __metadata("design:type", String)
], course.prototype, "course_type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20)
    }),
    __metadata("design:type", String)
], course.prototype, "course_model", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(500)
    }),
    __metadata("design:type", String)
], course.prototype, "course_over_view", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 1)
    }),
    __metadata("design:type", String)
], course.prototype, "course_rate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], course.prototype, "course_number_buyers", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        defaultValue: '1'
    }),
    __metadata("design:type", String)
], course.prototype, "course_active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT,
        defaultValue: 1
    }),
    __metadata("design:type", String)
], course.prototype, "course_comming_soon", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], course.prototype, "course_intro_video", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], course.prototype, "course_image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], course.prototype, "course_create_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], course.prototype, "course_update_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], course.prototype, "course_create_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], course.prototype, "course_update_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => category_models_1.default, () => categoryCourse_models_1.default),
    __metadata("design:type", Array)
], course.prototype, "categories", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => promotionCombo_models_1.default, () => comboCourse_models_1.default),
    __metadata("design:type", Array)
], course.prototype, "promotion_combos", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => buyer_models_1.default, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], course.prototype, "buyer_courses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => courseRequirment_models_1.default, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], course.prototype, "course_requirement", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => courseKnowledge_models_1.default, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], course.prototype, "course_knowledge", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => courseChapter_models_1.default, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], course.prototype, "course_chapter", void 0);
course = __decorate([
    sequelize_typescript_1.Table
], course);
exports.default = course;
