"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stockController_1 = __importDefault(require("../controllers/stockController"));
class stockRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', stockController_1.default.lista);
        this.router.get('/:id', stockController_1.default.getOne);
        this.router.post('/', stockController_1.default.create);
        this.router.put('/:id', stockController_1.default.update);
        this.router.delete('/:id', stockController_1.default.delete);
    }
}
exports.default = new stockRoutes().router;
