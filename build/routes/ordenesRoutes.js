"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ordenesController_1 = __importDefault(require("../controllers/ordenesController"));
class OrdenesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ordenesController_1.default.lista);
        this.router.get('/:id', ordenesController_1.default.getOne);
        this.router.post('/', ordenesController_1.default.create);
        this.router.put('/:id', ordenesController_1.default.update);
        this.router.delete('/:id', ordenesController_1.default.delete);
    }
}
exports.default = new OrdenesRoutes().router;
