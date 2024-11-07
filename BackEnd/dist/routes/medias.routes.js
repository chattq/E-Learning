"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medias_controllers_1 = __importDefault(require("../controllers/medias.controllers"));
const handlers_1 = require("../utils/handlers");
const mediasRouter = (0, express_1.Router)();
mediasRouter.post('/upload-images', 
// accessTokenValidator,
(0, handlers_1.wrapRequestHandler)(medias_controllers_1.default.uploadSingleImageController));
// mediasRouter.post('/upload-videos', accessTokenValidator, wrapRequestHandler(mediasController.uploadVideoController))
exports.default = mediasRouter;
