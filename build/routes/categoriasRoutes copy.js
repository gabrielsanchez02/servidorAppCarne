"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaController_1 = __importDefault(require("../controllers/categoriaController"));
class categoriasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', categoriaController_1.default.listado);
        //this.router.get('/:id', categoriascontroller.getOne);
        //this.router.post('/', categoriascontroller.create);       
        //this.router.put('/:id',categoriascontroller.update);
        //this.router.delete('/:id',categoriascontroller.delete)
    }
}
exports.default = new categoriasRoutes().router;
