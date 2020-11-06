"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const JWTvalidador_1 = __importDefault(require("../middlewares/JWTvalidador"));
const UserValidador_1 = __importDefault(require("../middlewares/UserValidador"));
class authRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/registrarse', authController_1.default.registrarse);
        this.router.post('/ingresar', [UserValidador_1.default.userisRegistrado], authController_1.default.ingresar);
        this.router.get('/perfil', [JWTvalidador_1.default.jwtVerify, UserValidador_1.default.getServiciosUser], authController_1.default.perfil);
        //  this.router.get('/servicios', authController.getServiciosUser);
        /* this.router.get('/:id', stockController.getOne);
         this.router.post('/', stockController.create);
         this.router.put('/:id', stockController.update);
         this.router.delete('/:id', stockController.delete);*/
    }
}
exports.default = new authRoutes().router;
