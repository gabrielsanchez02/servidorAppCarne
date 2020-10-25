"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
class authRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/singup', authController_1.default.singup);
        this.router.post('/singin', authController_1.default.singin);
        this.router.get('/perfil', authController_1.default.perfil);
        /* this.router.get('/:id', stockController.getOne);
         this.router.post('/', stockController.create);
         this.router.put('/:id', stockController.update);
         this.router.delete('/:id', stockController.delete);*/
    }
}
exports.default = new authRoutes().router;
