"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localesController_1 = __importDefault(require("../controllers/localesController"));
class LocalesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', localesController_1.default.lista);
        this.router.get('/:id', localesController_1.default.getOne);
        this.router.post('/', localesController_1.default.create);
        this.router.put('/:id', localesController_1.default.update);
        this.router.delete('/:id', localesController_1.default.delete);
    }
}
exports.default = new LocalesRoutes().router;
