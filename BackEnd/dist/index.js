"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middlewares_1 = require("./middlewares/error.middlewares");
const http_1 = require("http");
const socket_io_1 = require("./socket.io");
const databaseConnect_middlewares_1 = require("./middlewares/databaseConnect.middlewares");
const cors_1 = __importDefault(require("cors"));
const roomHandler_1 = require("./socket.io/roomHandler");
const use_router_1 = __importDefault(require("./use_router"));
const connection_database_1 = require("./config/connection-database");
require('dotenv').config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const port = process.env.PORT;
// initFolder()
app.use(express_1.default.urlencoded({ extended: true }));
// tạo folder upload
app.use(express_1.default.json());
const corsOptions = {
    origin: 'http://localhost:5000'
};
app.use((0, cors_1.default)(corsOptions));
const startServer = async () => {
    try {
        await connection_database_1.connectDbSequelize.authenticate();
        // console.log(`Kết nối database thành công`)
        await connection_database_1.connectDbSequelize.sync({ alter: true, force: false });
        //alter: true điều này làm giảm hiệu xuất do phải thay đổi các cấu trúc của bảng, nếu chạy thật thì alter: false
        //alter: true: Cập nhật cấu trúc bảng để phù hợp với mô hình mà không phá hủy dữ liệu hiện tại.
        //Điều này an toàn hơn so với force.
        app.use('/', use_router_1.default);
        app.use(databaseConnect_middlewares_1.checkConnectionDB);
        app.use(error_middlewares_1.defaultErrorHandler);
        const io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: 'http://localhost:5000'
            }
        });
        // kết nối socketIO
        io.on('connection', (socket) => {
            console.log(`user ${socket.id} connected`);
            (0, roomHandler_1.roomHandler)(socket, io);
            socket.on('disconnect', () => {
                console.log(`user ${socket.id} disconnected`);
            });
        });
        httpServer.listen(port, async () => {
            console.log(`Example app listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
startServer();
