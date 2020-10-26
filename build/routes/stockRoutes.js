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
        this.router.get('/', stockController_1.default.listado);
        this.router.get('/:cant/:subcat', stockController_1.default.listadoxcant);
        /*this.router.post('/', stockController.create);
        this.router.put('/:id', stockController.update);
        this.router.delete('/:id', stockController.delete);*/
    }
}
exports.default = new stockRoutes().router;
