"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reSendEmailValidator = exports.sendEmailValidator = exports.emailVerifyTokenValidator = exports.refreshTokenValidator = exports.accessTokenNoVerifyValidator = exports.accessTokenValidator = exports.registerValidator = exports.loginValidator = void 0;
const dotenv_1 = require("dotenv");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const lodash_1 = require("lodash");
const users_messages_1 = require("../constants/messages-handle/users.messages");
const validation_1 = require("../utils/validation");
const user_models_1 = __importDefault(require("../models/user.models"));
const crypto_1 = require("../utils/crypto");
const enums_1 = require("../constants/enums");
const Errors_1 = require("../utils/Errors");
const jwt_1 = require("../utils/jwt");
(0, dotenv_1.config)();
exports.loginValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    email: {
        notEmpty: {
            errorMessage: users_messages_1.USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        in: ['body'],
        isEmail: true,
        trim: true,
        custom: {
            options: async (value, { req }) => {
                const { email, password } = req.body;
                const isExist = await user_models_1.default.findAll({
                    where: {
                        user_email: email.toUpperCase(),
                        user_password: (0, crypto_1.hasPassword)(password)
                    }
                });
                if (isExist.length > 0) {
                    if (isExist[0].dataValues.verify === enums_1.UserVerifyStatus.Unverified) {
                        throw new Errors_1.ErrorWithStatus({ message: users_messages_1.USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED, status: 200 });
                    }
                    if (isExist[0].dataValues.verify === enums_1.UserVerifyStatus.Banned) {
                        throw new Errors_1.ErrorWithStatus({ message: 'Tài khoản của bạn đang bị khóa', status: 200 });
                    }
                }
                if (isExist?.length === 0) {
                    throw new Errors_1.ErrorWithStatus({ message: users_messages_1.USERS_MESSAGES.EMAIL_AND_PASSWORD_REQUIRED, status: 200 });
                }
                return true;
            }
        }
    },
    password: {
        notEmpty: true,
        isStrongPassword: {
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: 'Password must be at least 6 characters, and at least 1 lowercase,1 uppercase,1 numbers, 1 symbols'
        },
        in: ['body'],
        isLength: {
            options: { min: 6, max: 50 },
            errorMessage: 'Password must be at least 6 characters long'
        }
    }
}, ['body']));
exports.registerValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    name: {
        notEmpty: {
            errorMessage: users_messages_1.USERS_MESSAGES.NAME_IS_REQUIRED
        },
        in: 'body',
        isString: {
            errorMessage: users_messages_1.USERS_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        escape: true
    },
    role: {
        notEmpty: {
            errorMessage: 'Loại tài khoản không được để trống'
        },
        in: 'body',
        trim: true,
        custom: {
            options: async (value) => {
                const allowedValues = ['0', '1', '2'];
                if (!allowedValues.includes(value)) {
                    throw new Errors_1.ErrorWithStatus({
                        message: "Giá trị không hợp lệ. Chỉ cho phép '1', '2' hoặc '3'.",
                        status: 200
                    });
                }
                return true;
            }
        }
    },
    email: {
        notEmpty: {
            errorMessage: users_messages_1.USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        in: ['body'],
        isEmail: true,
        trim: true,
        custom: {
            options: async (value) => {
                const isExist = await user_models_1.default.findOne({
                    where: {
                        user_email: value.toUpperCase()
                    }
                });
                if (isExist !== null) {
                    throw new Errors_1.ErrorWithStatus({ message: users_messages_1.USERS_MESSAGES.EMAIL_ALREADY_EXIST, status: 400 });
                }
                return true;
            }
        }
    },
    password: {
        notEmpty: true,
        isStrongPassword: {
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            },
            errorMessage: 'Password must be at least 6 characters, and at least 1 lowercase,1 uppercase,1 numbers, 1 symbols'
        },
        in: ['body'],
        isLength: {
            options: { min: 6, max: 50 },
            errorMessage: 'Password must be at least 6 characters long'
        }
    },
    confirm_password: {
        notEmpty: true,
        isStrongPassword: {
            errorMessage: 'Password must be at least 6 characters, and at least 1 lowercase,1 uppercase,1 numbers, 1 symbols',
            options: {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            }
        },
        in: ['body'],
        isLength: {
            options: { min: 6, max: 50 },
            errorMessage: 'Password must be at least 6 characters long'
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true;
            },
            errorMessage: 'Passwords do not match'
        }
    }
}, ['body']));
exports.accessTokenValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    Authorization: {
        custom: {
            options: async (value, { req }) => {
                const access_token = (value || '').split(' ')[1];
                if (!access_token) {
                    throw new Errors_1.ErrorWithStatus({ message: users_messages_1.USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED, status: 401 });
                }
                try {
                    const decoded_authorization = await (0, jwt_1.verifyToken)({
                        token: access_token,
                        secretOrPublickey: process.env.JWT_SECRET_ACCESS_TOKEN
                    });
                    if (decoded_authorization.verify === enums_1.UserVerifyStatus.Unverified) {
                        throw new Errors_1.ErrorWithStatus({ message: 'Vui lòng xác thực tài khoản', status: 200 });
                    }
                    if (decoded_authorization.verify === enums_1.UserVerifyStatus.Banned) {
                        throw new Errors_1.ErrorWithStatus({ message: 'Tài khoản của bạn tạm thời bị khóa', status: 200 });
                    }
                    ;
                    req.decoded_authorization = decoded_authorization;
                }
                catch (error) {
                    throw new Errors_1.ErrorWithStatus({ message: (0, lodash_1.capitalize)(error.message), status: 401 });
                }
                return true;
            }
        }
    }
}, ['headers']));
exports.accessTokenNoVerifyValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    Authorization: {
        custom: {
            options: async (value, { req }) => {
                const access_token = (value || '').split(' ')[1];
                if (!access_token) {
                    throw new Errors_1.ErrorWithStatus({ message: users_messages_1.USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED, status: 200 });
                }
                try {
                    const decoded_authorization = await (0, jwt_1.verifyToken)({
                        token: access_token,
                        secretOrPublickey: process.env.JWT_SECRET_ACCESS_TOKEN
                    });
                    req.decoded_authorization = decoded_authorization;
                    const inforUser = await user_models_1.default.findOne({
                        where: {
                            user_id: decoded_authorization.user_id.toUpperCase()
                        }
                    });
                    if (!inforUser) {
                        throw new Errors_1.ErrorWithStatus({ message: 'Không tìm thấy tài khoản này', status: 200 });
                    }
                }
                catch (error) {
                    throw new Errors_1.ErrorWithStatus({ message: (0, lodash_1.capitalize)(error.message), status: 200 });
                }
                return true;
            }
        }
    }
}, ['headers']));
exports.refreshTokenValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    refresh_token: {
        trim: true,
        custom: {
            options: async (value, { req }) => {
                try {
                    const decoded_refresh_token = await (0, jwt_1.verifyToken)({
                        token: value,
                        secretOrPublickey: process.env.JWT_SECRET_REFRESH_TOKEN
                    });
                    // const refreshToken = await userModel.findRefreshToken(value, decoded_refresh_token.user_id)
                    const refreshToken = '';
                    req.decoded_refresh_token = decoded_refresh_token;
                    if (!refreshToken) {
                        throw new Errors_1.ErrorWithStatus({ message: users_messages_1.USERS_MESSAGES.REFRESH_TOKEN_IS_NOT_EXIST, status: 401 });
                    }
                    // thêm bước kiểm tra có trong db hay không =>>> chưa thiết kế nên chưa làm
                }
                catch (error) {
                    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                        throw new Errors_1.ErrorWithStatus({
                            message: (0, lodash_1.capitalize)(error.message),
                            status: 401
                        });
                    }
                    throw error;
                }
                return true;
            }
        }
    }
}, ['body']));
exports.emailVerifyTokenValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    verification_code: {
        trim: true,
        notEmpty: true,
        custom: {
            options: async (value, { req }) => {
                const decode = req.decoded_authorization;
                const inforUser = await user_models_1.default.findOne({
                    where: {
                        user_id: decode.user_id.toUpperCase()
                    }
                });
                const currentTime = new Date();
                const inputDate = new Date(inforUser?.dataValues.expiresAt); // Chuyển đổi chuỗi thành Date
                // Tính khoảng thời gian giữa hai thời điểm (millisecond)
                const timeDifference = currentTime - inputDate; // Kết quả là millisecond
                // Chuyển đổi 1 phút thành millisecond
                const oneMinute = 60 * 1000;
                if (inforUser) {
                    if (!inforUser?.dataValues.verify_cation_code) {
                        throw new Errors_1.ErrorWithStatus({ message: 'Bạn đã xác thực tài khoản này rồi!', status: 200 });
                    }
                    if (value !== inforUser?.dataValues.verify_cation_code) {
                        throw new Errors_1.ErrorWithStatus({ message: 'Mã xác thực không hợp lệ', status: 200 });
                    }
                    else {
                        // Kiểm tra xem thời điểm đầu vào có lớn hơn 1 phút so với thời điểm hiện tại không
                        if (timeDifference > oneMinute) {
                            throw new Errors_1.ErrorWithStatus({ message: 'Mã xác thực đã hết hiệu lực', status: 200 });
                        }
                    }
                }
                else {
                    throw new Errors_1.ErrorWithStatus({ message: 'Không tìm thấy tài khoản này', status: 200 });
                }
                return true;
            }
        }
    },
    Authorization: {
        custom: {
            options: async (value, { req }) => {
                const access_token = (value || '').split(' ')[1];
                if (!access_token) {
                    throw new Errors_1.ErrorWithStatus({ message: users_messages_1.USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED, status: 401 });
                }
                try {
                    const decoded_authorization = await (0, jwt_1.verifyToken)({
                        token: access_token,
                        secretOrPublickey: process.env.JWT_SECRET_ACCESS_TOKEN
                    });
                    req.decoded_authorization = decoded_authorization;
                }
                catch (error) {
                    throw new Errors_1.ErrorWithStatus({ message: (0, lodash_1.capitalize)(error.message), status: 401 });
                }
                return true;
            }
        }
    }
}, ['body', 'headers']));
exports.sendEmailValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    MailTo: {
        notEmpty: {
            errorMessage: users_messages_1.USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        in: ['body'],
        isEmail: true,
        trim: true
    }
}, ['body']));
exports.reSendEmailValidator = (0, validation_1.validate)((0, express_validator_1.checkSchema)({
    Authorization: {
        custom: {
            options: async (value, { req }) => {
                const access_token = (value || '').split(' ')[1];
                if (!access_token) {
                    throw new Errors_1.ErrorWithStatus({ message: users_messages_1.USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED, status: 401 });
                }
                try {
                    const decoded_authorization = await (0, jwt_1.verifyToken)({
                        token: access_token,
                        secretOrPublickey: process.env.JWT_SECRET_ACCESS_TOKEN
                    });
                    req.decoded_authorization = decoded_authorization;
                }
                catch (error) {
                    throw new Errors_1.ErrorWithStatus({ message: (0, lodash_1.capitalize)(error.message), status: 401 });
                }
                return true;
            }
        }
    }
}, ['headers']));
// export const forgotPasswordValidator = validate(
//   checkSchema(
//     {
//       email: {
//         isEmail: {
//           errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
//         },
//         trim: true,
//         custom: {
//           options: async (value, { req }) => {
//             const user = await databaseService.users.findOne({
//               email: value
//             })
//             if (user === null) {
//               throw new Error(USERS_MESSAGES.USER_NOT_FOUND)
//             }
//             req.user = user
//             return true
//           }
//         }
//       }
//     },
//     ['body']
//   )
// )
// export const verifyForgotPasswordTokenValidator = validate(
//   checkSchema(
//     {
//       forgot_password_token: forgotPasswordTokenSchema
//     },
//     ['body']
//   )
// )
// export const resetPasswordValidator = validate(
//   checkSchema(
//     {
//       password: passwordSchema,
//       confirm_password: confirmPasswordSchema,
//       forgot_password_token: forgotPasswordTokenSchema
//     },
//     ['body']
//   )
// )
// export const verifiedUserValidator = (req: Request, res: Response, next: NextFunction) => {
//   const { verify } = req.decoded_authorization as TokenPayload
//   if (verify !== UserVerifyStatus.Verified) {
//     return next(
//       new ErrorWithStatus({
//         message: USERS_MESSAGES.USER_NOT_VERIFIED,
//         status: httpStatus.FORBIDDEN
//       })
//     )
//   }
//   next()
// }
