"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConnectionDB = void 0;
const connection_database_1 = require("../config/connection-database");
const checkConnectionDB = async (req, res, next) => {
    try {
        await connection_database_1.connectDbSequelize.authenticate();
        console.log('Connection has been established successfully.');
        await connection_database_1.connectDbSequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
        next();
    }
    catch (error) {
        // Nếu không thể kết nối, trả về lỗi
        Object.getOwnPropertyNames(error).forEach((key) => {
            Object.defineProperty(error, key, { enumerable: true });
        });
        return res.status(500).json({
            Success: false,
            data: {
                message: 'Error connecting to database',
                detail: error
            }
        });
    }
};
exports.checkConnectionDB = checkConnectionDB;
