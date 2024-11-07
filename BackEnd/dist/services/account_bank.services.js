"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const vietQr_config_1 = require("../config/vietQr.config");
(0, dotenv_1.config)();
class AccountBankService {
    async getListBank() {
        return new Promise((resolve, reject) => {
            return vietQr_config_1.vietQR
                .getBanks()
                .then((banks) => resolve(banks))
                .catch((err) => reject(err));
        });
    }
    async create_account(payload, user_id) {
        return new Promise((resolve, reject) => {
            return vietQr_config_1.vietQR
                .getBanks()
                .then((banks) => resolve(banks))
                .catch((err) => reject(err));
        });
    }
}
const accountBankServices = new AccountBankService();
exports.default = accountBankServices;
