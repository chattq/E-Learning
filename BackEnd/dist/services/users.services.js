"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const enums_1 = require("../constants/enums");
const refreshToken_models_1 = __importDefault(require("../models/refreshToken.models"));
const user_models_1 = __importDefault(require("../models/user.models"));
const crypto_1 = require("../utils/crypto");
const email_1 = require("../utils/email");
const jwt_1 = require("../utils/jwt");
const useGetTime_1 = require("../utils/useGetTime");
const useRandomOTP_1 = require("../utils/useRandomOTP");
const { getTimeMoment } = (0, useGetTime_1.useGetTime)();
const { generateRandomOTP } = (0, useRandomOTP_1.useRandomOTP)();
(0, dotenv_1.config)();
class UserService {
    signAccessToken({ user_id, verify }) {
        return (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enums_1.TokenType.AccessToken,
                verify
            },
            privateKey: process.env.JWT_SECRET_ACCESS_TOKEN,
            options: {
                expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
            }
        });
    }
    signRefreshToken({ user_id, verify }) {
        return (0, jwt_1.signToken)({
            payload: {
                user_id,
                token_type: enums_1.TokenType.RefreshToken,
                verify
            },
            privateKey: process.env.JWT_SECRET_REFRESH_TOKEN,
            options: {
                expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
            }
        });
    }
    decodeRefreshToken(refresh_token) {
        return (0, jwt_1.verifyToken)({
            token: refresh_token,
            secretOrPublickey: process.env.JWT_SECRET_REFRESH_TOKEN
        });
    }
    signAccessAndRefreshToken({ user_id, verify }) {
        return Promise.all([this.signAccessToken({ user_id, verify }), this.signRefreshToken({ user_id, verify })]);
    }
    async registerUser(payload) {
        const { email, name, password, role } = payload;
        const OTP = generateRandomOTP();
        const timeMoment = getTimeMoment();
        const dataCreateUser = {
            user_id: email.toUpperCase(),
            user_name: name,
            user_email: email.toUpperCase(),
            user_password: (0, crypto_1.hasPassword)(password),
            user_create_at: timeMoment,
            verify_cation_code: OTP,
            expiresAt: timeMoment,
            user_role: role
        };
        await user_models_1.default.create(dataCreateUser);
        const [Access_token, Refresh_tokens] = await this.signAccessAndRefreshToken({
            user_id: email,
            verify: enums_1.UserVerifyStatus.Unverified
        });
        await refreshToken_models_1.default.create({
            user_id: email.toUpperCase(),
            token: Refresh_tokens,
            create_at: timeMoment
        });
        await (0, email_1.sendVerifyRegisterEmail)(payload.email, OTP);
        return {
            Access_token,
            Refresh_tokens
        };
    }
    async login(user_id) {
        const inforUser = await user_models_1.default.findOne({
            where: {
                user_email: user_id.toUpperCase()
            }
        });
        const [Access_token, Refresh_token] = await this.signAccessAndRefreshToken({
            user_id: user_id.toUpperCase(),
            verify: inforUser?.dataValues.verify
        });
        await refreshToken_models_1.default.update({ token: Refresh_token }, {
            where: {
                user_id: user_id.toUpperCase()
            }
        });
        return {
            Access_token,
            Refresh_token,
            inforUser
        };
    }
    async logout(user_id) {
        // return await userModel.logoutQuery(user_id)
    }
    async getProfile(user_id) {
        return await user_models_1.default.findOne({
            where: {
                user_id: user_id.toUpperCase()
            }
        });
    }
    async verifyEmail(verification_code, user_id) {
        // Tìm user theo ID
        const updatedData = {
            verify_cation_code: '',
            verify: enums_1.UserVerifyStatus.Verified,
            expiresAt: ''
        };
        // Cập nhật thông tin user
        // Trả về user đã cập nhật
        const [token] = await Promise.all([
            this.signAccessAndRefreshToken({
                user_id: user_id.toUpperCase(),
                verify: enums_1.UserVerifyStatus.Verified
            }),
            user_models_1.default.update(updatedData, {
                where: {
                    user_id: user_id.toUpperCase()
                }
            })
        ]);
        const [access_token, refresh_tokens] = token;
        await refreshToken_models_1.default.update({
            token: refresh_tokens
        }, {
            where: {
                user_id: user_id.toUpperCase()
            }
        });
        return {
            access_token,
            refresh_tokens
        };
    }
    async reSendVerifyEmail(user_id) {
        const OTP = generateRandomOTP();
        const timeMoment = getTimeMoment();
        const updatedData = {
            verify_cation_code: OTP,
            expiresAt: timeMoment
        };
        await Promise.all([
            user_models_1.default.update(updatedData, {
                where: {
                    user_id: user_id.toUpperCase()
                }
            }),
            (0, email_1.sendVerifyRegisterEmail)(user_id, OTP)
        ]);
        return null;
    }
}
const userService = new UserService();
exports.default = userService;
