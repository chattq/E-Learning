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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let blog = class blog extends sequelize_typescript_1.Model {
    blog_id;
    blog_title;
    blog_content;
    image_url;
    blog_author;
    created_at;
    updated_at;
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], blog.prototype, "blog_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false
    }),
    __metadata("design:type", String)
], blog.prototype, "blog_title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false
    }),
    __metadata("design:type", String)
], blog.prototype, "blog_content", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255)
    }),
    __metadata("design:type", String)
], blog.prototype, "image_url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255)
    }),
    __metadata("design:type", String)
], blog.prototype, "blog_author", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], blog.prototype, "created_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date
    // Thiết lập mối quan hệ với bảng User
    // @ForeignKey(() => user)
    // @Column({
    //   type: DataType.STRING(100),
    //   allowNull: false
    // })
    // user_id!: string
    // @BelongsTo(() => user)
    // user!: user
    )
], blog.prototype, "updated_at", void 0);
blog = __decorate([
    sequelize_typescript_1.Table
], blog);
exports.default = blog;
