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
const comboCourse_models_1 = __importDefault(require("./comboCourse.models"));
let promotion_combo = class promotion_combo extends sequelize_typescript_1.Model {
    promotion_combo_id;
    course_id;
    combo_products;
    promotion_combo_name;
    promotion_combo_rateDc; //  phần trăm giảm
    promotion_combo_dcMax; //số tiền giảm tối đa
    promotion_combo_discount; // tiền giảm
    promotion_combo_priceProduct;
    promotion_combo_maxProducts; // tối đa bao nhiêu sản phẩm
    promotion_combo_discountType;
    promotion_combo_startDate;
    promotion_combo_endDate;
    promotion_combo_create_by;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        primaryKey: true
    }),
    __metadata("design:type", String)
], promotion_combo.prototype, "promotion_combo_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => comboCourse_models_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], promotion_combo.prototype, "course_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => comboCourse_models_1.default, { foreignKey: 'course_id', onDelete: 'CASCADE' }),
    __metadata("design:type", comboCourse_models_1.default)
], promotion_combo.prototype, "combo_products", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], promotion_combo.prototype, "promotion_combo_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        unique: true,
        allowNull: false
    }),
    __metadata("design:type", Number)
], promotion_combo.prototype, "promotion_combo_rateDc", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        unique: true,
        allowNull: false
    }),
    __metadata("design:type", Number)
], promotion_combo.prototype, "promotion_combo_dcMax", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        unique: true,
        allowNull: false
    }),
    __metadata("design:type", Number)
], promotion_combo.prototype, "promotion_combo_discount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        unique: true,
        allowNull: false
    }),
    __metadata("design:type", Number)
], promotion_combo.prototype, "promotion_combo_priceProduct", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    __metadata("design:type", Number)
], promotion_combo.prototype, "promotion_combo_maxProducts", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('percent', 'fixed')
    }),
    __metadata("design:type", String)
], promotion_combo.prototype, "promotion_combo_discountType", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", Date)
], promotion_combo.prototype, "promotion_combo_startDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", Date)
], promotion_combo.prototype, "promotion_combo_endDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], promotion_combo.prototype, "promotion_combo_create_by", void 0);
promotion_combo = __decorate([
    sequelize_typescript_1.Table
], promotion_combo);
exports.default = promotion_combo;
