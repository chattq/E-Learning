"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("../utils/file");
class MediasService {
    async handleUploadSingleImage(req) {
        const file = (await (0, file_1.handleFileUpload)(req));
        return {
            TimeUpload: file.created_at,
            FileSize: file.bytes,
            FileName: file.originalFilename,
            FileType: file.format,
            FileUrl: file.url
        };
    }
}
const mediasService = new MediasService();
exports.default = mediasService;
