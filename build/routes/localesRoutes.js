"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class LocalesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //this.router.get('/', localesController.lista);
        //this.router.get('/:id', localesController.getOne);
        //this.router.post('/', localesController.create);
        //this.router.put('/:id', localesController.update);
        //this.router.delete('/:id', localesController.delete);
    }
}
exports.default = new LocalesRoutes().router;
