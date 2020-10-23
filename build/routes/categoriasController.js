"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriasController_1 = __importDefault(require("../controllers/categoriasController"));
class CategoriasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', categoriasController_1.default.lista);
        this.router.get('/:id', categoriasController_1.default.getOne);
        this.router.post('/', categoriasController_1.default.create);
        this.router.put('/:id', categoriasController_1.default.update);
        this.router.delete('/:id', categoriasController_1.default.delete);
    }
}
exports.default = new CategoriasRoutes().router;
