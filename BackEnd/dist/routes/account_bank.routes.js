"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_bank_controllers_1 = __importDefault(require("../controllers/account_bank.controllers"));
const users_middlewares_1 = require("../middlewares/users.middlewares");
const account_bankRouters = (0, express_1.Router)();
account_bankRouters.post('/GetListBank', users_middlewares_1.accessTokenValidator, account_bank_controllers_1.default.getListBank);
account_bankRouters.post('/Create', users_middlewares_1.accessTokenValidator, account_bank_controllers_1.default.createBank);
exports.default = account_bankRouters;
