"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = __importDefault(require("../controllers/users.controllers"));
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const usersRouter = (0, express_1.Router)();
usersRouter.post('/login', users_middlewares_1.loginValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.default.loginController));
usersRouter.post('/register', users_middlewares_1.registerValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.default.registerController));
usersRouter.post('/logout', users_middlewares_1.accessTokenValidator, users_middlewares_1.refreshTokenValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.default.logoutController));
usersRouter.post('/sendEmail', users_middlewares_1.sendEmailValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.default.sendEmail));
/**
 * Description:
 * Path: /verify-email
 * Method: Post
 * Header:
 * Body: email_verify_token
 */
usersRouter.post('/verify-email', users_middlewares_1.emailVerifyTokenValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.default.emailVerifyController));
/**
 * Description: verify email when user client click on the link in email
 * Path: /resen-verify-email
 * Method: Post
 * Header: {Authorization: 'Bearer ' + <accessToken>}
 * Body: {}
 */
usersRouter.post('/resent-verify-email', users_middlewares_1.reSendEmailValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.default.reSendEmailVerifyController));
/**
 * Description: get my profile
 * Path: /me
 * Method: Post
 * Header: {Authorization: 'Bearer ' + <accessToken>}
 */
usersRouter.post('/me', users_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.default.getMeController));
usersRouter.post('/getOTPtime', users_middlewares_1.accessTokenNoVerifyValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.default.getTimeOTPController));
exports.default = usersRouter;
