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
const refreshToken_models_1 = __importDefault(require("./refreshToken.models"));
const course_models_1 = __importDefault(require("./course.models"));
const accountBank_models_1 = __importDefault(require("./accountBank.models"));
let user = class user extends sequelize_typescript_1.Model {
    user_id;
    user_email;
    user_name;
    user_phone;
    user_password;
    user_address;
    user_avatar;
    verify_cation_code;
    expiresAt;
    forgot_password_token;
    verify;
    user_date_of_birth;
    user_website;
    user_bio;
    user_role;
    user_active;
    user_language;
    user_time_zone;
    //Từ khóa declare được sử dụng trong TypeScript để thông báo cho trình biên dịch biết rằng thuộc tính này sẽ được cung cấp bởi Sequelize và không được khởi tạo rõ ràng trong constructor.
    courses;
    // mối quan hệ 1 nhiều
    account_banks;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        primaryKey: true
    }),
    __metadata("design:type", String)
], user.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: true
    }),
    __metadata("design:type", String)
], user.prototype, "user_email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        defaultValue: ''
    }),
    __metadata("design:type", String)
], user.prototype, "user_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        defaultValue: ''
    }),
    __metadata("design:type", String)
], user.prototype, "user_phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], user.prototype, "user_password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], user.prototype, "user_address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], user.prototype, "user_avatar", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(25)
    }),
    __metadata("design:type", String)
], user.prototype, "verify_cation_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200)
    }),
    __metadata("design:type", String)
], user.prototype, "expiresAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(300)
    }),
    __metadata("design:type", String)
], user.prototype, "forgot_password_token", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        defaultValue: 'Unverified'
    }),
    __metadata("design:type", String)
], user.prototype, "verify", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100)
    }),
    __metadata("design:type", String)
], user.prototype, "user_date_of_birth", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200)
    }),
    __metadata("design:type", String)
], user.prototype, "user_website", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(500)
    }),
    __metadata("design:type", String)
], user.prototype, "user_bio", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('1', '0', '2')
    }),
    __metadata("design:type", String)
], user.prototype, "user_role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        defaultValue: '1'
    }),
    __metadata("design:type", String)
], user.prototype, "user_active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        defaultValue: 'vi'
    }),
    __metadata("design:type", String)
], user.prototype, "user_language", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        defaultValue: '7'
    }),
    __metadata("design:type", String)
], user.prototype, "user_time_zone", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => refreshToken_models_1.default, { onDelete: 'CASCADE' }),
    __metadata("design:type", refreshToken_models_1.default
    //Từ khóa declare được sử dụng trong TypeScript để thông báo cho trình biên dịch biết rằng thuộc tính này sẽ được cung cấp bởi Sequelize và không được khởi tạo rõ ràng trong constructor.
    )
], user.prototype, "refresh_tokens", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => course_models_1.default, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], user.prototype, "courses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => accountBank_models_1.default, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], user.prototype, "account_banks", void 0);
user = __decorate([
    sequelize_typescript_1.Table
], user);
exports.default = user;
