"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsReturned = void 0;
class ResultsReturned {
    isSuccess;
    message;
    data;
    constructor({ isSuccess, message, data }) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.data = data;
    }
}
exports.ResultsReturned = ResultsReturned;
