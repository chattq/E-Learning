"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDbSequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const pg = __importStar(require("pg"));
require('dotenv').config();
exports.connectDbSequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME_DATABASE,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectModule: pg,
    logging: false, // Tắt toàn bộ logging
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [path.join(__dirname, '..', 'models')], // Thay đổi đường dẫn tới thư mục models
    pool: {
        max: 1000, // Số kết nối tối đa trong pool
        min: 0, // Số kết nối tối thiểu trong pool
        acquire: 30000, // Thời gian tối đa (ms) để cố gắng lấy một kết nối trước khi throw error
        idle: 10000 // Thời gian tối đa (ms) mà một kết nối có thể ở trạng thái nhàn rỗi trước khi bị đóng
    },
    dialectOptions: {
        ssl: {
            require: true, // Enforces SSL connection
            rejectUnauthorized: false // Allows self-signed certificates (optional, for local testing)
        }
    }
});
// Load all models from the models directory
const modelsDir = path.join(__dirname, '..', 'models');
fs.readdirSync(modelsDir)
    .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.ts') //// Lọc các tệp .ts
    .forEach((file) => {
    const model = require(path.join(modelsDir, file)).default;
    exports.connectDbSequelize.addModels([model]);
});
