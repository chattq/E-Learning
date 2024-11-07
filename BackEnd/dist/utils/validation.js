"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const httpStatus_1 = require("../constants/httpStatus");
const Errors_1 = require("./Errors");
// sequential processing, stops running validations chain if the previous one fails.
const validate = (validations) => {
    return async (req, res, next) => {
        await validations.run(req);
        const errors = (0, express_validator_1.validationResult)(req);
        // nếu không có lỗi thì next tiếp tục request
        if (errors.isEmpty()) {
            return next();
        }
        const errorsObject = errors.mapped();
        const entityError = new Errors_1.EntityError({ errors: {} });
        for (const key in errorsObject) {
            const { msg, value } = errorsObject[key];
            // lỗi không phải do validate
            if (msg instanceof Errors_1.ErrorWithStatus && msg.status !== httpStatus_1.httpStatus.UNPROCESSABLE_ENTITY) {
                return next(msg);
            }
            entityError.errors[key] = {
                message: msg,
                value: value
            };
        }
        next(entityError);
    };
};
exports.validate = validate;
