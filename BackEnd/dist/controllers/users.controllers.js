"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_messages_1 = require("../constants/messages-handle/users.messages");
const nodemailer_1 = __importDefault(require("nodemailer"));
const results_api_1 = require("../utils/results-api");
const users_services_1 = __importDefault(require("../services/users.services"));
require('dotenv').config();
class UserController {
    async registerController(req, res) {
        const { name, email, password, role } = req.body;
        const result = await users_services_1.default.registerUser({ name, email, password, role });
        return res.json(new results_api_1.ResultsReturned({
            isSuccess: true,
            message: 'Register successful',
            data: {
                InforUser: {
                    user_id: email.toUpperCase()
                },
                ...result
            }
        }));
    }
    async loginController(req, res) {
        const { email, password } = req.body;
        const result = await users_services_1.default.login(email);
        return res.json(new results_api_1.ResultsReturned({
            isSuccess: true,
            message: 'Login successful',
            data: {
                InforUser: {
                    id: result.inforUser?.dataValues.user_id,
                    email: result.inforUser?.dataValues.user_email,
                    name: result.inforUser?.dataValues.user_name,
                    avatar: result.inforUser?.dataValues.user_avatar
                },
                Access_token: result.Access_token,
                Refresh_token: result.Refresh_token
            }
        }));
    }
    async logoutController(req, res) {
        const user_id = req.decoded_authorization?.user_id;
        await users_services_1.default.logout(user_id);
        return res.json(new results_api_1.ResultsReturned({
            isSuccess: true,
            message: users_messages_1.USERS_MESSAGES.LOGOUT_SUCCESS,
            data: null
        }));
    }
    async emailVerifyController(req, res) {
        const { verification_code } = req.body;
        const user_id = req.decoded_authorization?.user_id;
        const result = await users_services_1.default.verifyEmail(verification_code, user_id);
        return res.json({
            isSuccess: true,
            message: 'Xác thực thành công!',
            data: result
        });
    }
    async reSendEmailVerifyController(req, res) {
        const user_id = req.decoded_authorization?.user_id;
        await users_services_1.default.reSendVerifyEmail(user_id);
        return res.json({
            isSuccess: true,
            message: 'Đã gửi lại mã thành công, vui lòng kiểm tra email',
            data: null
        });
    }
    async sendEmail(req, res) {
        const { subject, html, text, MailTo } = req.body;
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        const info = await transporter.sendMail({
            from: '"Hệ thống E-Learning" <baotuyet927@gmail.com>', // người gửi và email người gửi
            to: MailTo, // // người nhận
            subject: subject, // tiêu đề
            text: text, // plain text body
            html: html, // nội dung
            attachments: []
        });
        return res.json(new results_api_1.ResultsReturned({
            isSuccess: true,
            message: 'Gửi mail thành công',
            data: info.messageId
        }));
    }
    async getMeController(req, res, next) {
        const userId = req.decoded_authorization.user_id;
        const result = await users_services_1.default.getProfile(userId);
        return res.json(new results_api_1.ResultsReturned({
            isSuccess: true,
            message: 'Get profile successfully',
            data: {
                id: result?.dataValues.user_id,
                email: result?.dataValues.user_email,
                name: result?.dataValues.user_name,
                avatar: result?.dataValues.user_avatar
            }
        }));
    }
    async getTimeOTPController(req, res, next) {
        const userId = req.decoded_authorization.user_id;
        const result = await users_services_1.default.getProfile(userId);
        const expiresAt = result?.dataValues.expiresAt;
        const currentTime = new Date();
        const inputDate = new Date(expiresAt); // Chuyển đổi chuỗi thành Date
        // Tính khoảng thời gian giữa hai thời điểm (millisecond)
        const timeDifference = currentTime - inputDate; // Kết quả là millisecond
        // Chuyển đổi 1 phút thành millisecond
        const oneMinute = 60 * 1000;
        // Chuyển đổi timeDifference từ millisecond sang giây
        const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);
        return res.json(new results_api_1.ResultsReturned({
            isSuccess: true,
            message: 'Get time OTP',
            data: {
                expires_at: timeDifference > oneMinute ? 0 : 60 - timeDifferenceInSeconds
            }
        }));
    }
}
const userController = new UserController();
exports.default = userController;
