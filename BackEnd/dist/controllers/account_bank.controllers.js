"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_bank_services_1 = __importDefault(require("../services/account_bank.services"));
const results_api_1 = require("../utils/results-api");
class AccountBankController {
    //Thêm blog mới
    async getListBank(req, res) {
        const user_id = req.decoded_authorization?.user_id;
        console.log(38, user_id);
        const result = await account_bank_services_1.default.getListBank();
        return res.json(new results_api_1.ResultsReturned({
            isSuccess: true,
            message: 'Get success',
            data: result
        }));
    }
    async createBank(req, res) {
        const user_id = req.decoded_authorization?.user_id;
        await account_bank_services_1.default.create_account(req.body, user_id);
        return res.json(new results_api_1.ResultsReturned({
            isSuccess: true,
            message: 'Tạo thành công',
            data: []
        }));
    }
}
const accountBankController = new AccountBankController();
exports.default = accountBankController;
