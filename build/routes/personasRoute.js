"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personasController_1 = __importDefault(require("../controllers/personasController"));
class PersonasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', personasController_1.default.lista);
        this.router.get('/:id', personasController_1.default.getOne);
        //this.router.post('/', personasController.create);
        this.router.put('/:id', personasController_1.default.update);
        this.router.delete('/:id', personasController_1.default.delete);
        this.router.post('/add', (req, res) => {
            const { title, url, description } = req.body;
            const newLink = {
                title,
                url,
                description
                //ALMACENA ESOS DATOS EN LA VARIABLE NEWLINK
            };
        });
    }
}
exports.default = new PersonasRoutes().router;
