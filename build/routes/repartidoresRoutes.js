"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RepartidoresRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //  this.router.get('/', repartidoresController.lista);
        //  this.router.get('/:id', repartidoresController.getOne);
        //  this.router.post('/', repartidoresController.create);
        //  this.router.put('/:id', repartidoresController.update);
        //  this.router.delete('/:id', repartidoresController.delete);
    }
}
exports.default = new RepartidoresRoutes().router;
