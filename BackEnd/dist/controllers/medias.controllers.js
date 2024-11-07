"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleImageController = void 0;
const media_messages_1 = require("../constants/messages-handle/media.messages");
const media_services_1 = __importDefault(require("../services/media.services"));
const cloudinary = require('cloudinary').v2;
const uploadSingleImageController = async (req, res, next) => {
    const result = await media_services_1.default.handleUploadSingleImage(req);
    return res.json({
        isSuccess: true,
        message: 'Upload successful',
        Data: result
    });
};
exports.uploadSingleImageController = uploadSingleImageController;
class MediasController {
    async uploadSingleImageController(req, res, next) {
        const result = await media_services_1.default.handleUploadSingleImage(req);
        return res.json({
            isSuccess: true,
            message: media_messages_1.MEDIAS_MESSAGES.UPLOAD_SUCCESS,
            data: result
        });
    }
}
const mediasController = new MediasController();
exports.default = mediasController;
