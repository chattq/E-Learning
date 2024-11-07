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
const user_models_1 = __importDefault(require("./user.models"));
let refresh_token = class refresh_token extends sequelize_typescript_1.Model {
    token;
    create_at;
    // khóa ngoại
    user_id;
    // mối liên hệ với bảng
    user; // tham chiếu đến bảng
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], refresh_token.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(300),
        allowNull: false
    }),
    __metadata("design:type", String)
], refresh_token.prototype, "token", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(300)
    }),
    __metadata("design:type", String)
], refresh_token.prototype, "create_at", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_models_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], refresh_token.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_models_1.default, { foreignKey: 'user_id', onDelete: 'CASCADE' }),
    __metadata("design:type", user_models_1.default // tham chiếu đến bảng
    )
], refresh_token.prototype, "user", void 0);
refresh_token = __decorate([
    sequelize_typescript_1.Table
], refresh_token);
exports.default = refresh_token;
