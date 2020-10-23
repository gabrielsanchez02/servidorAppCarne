"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexcontroller_1 = require("../controllers/indexcontroller");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', indexcontroller_1.indexcontroller.index);
        this.router.get('/carlos', indexcontroller_1.indexcontroller.carlos);
        this.router.get('/api', indexcontroller_1.indexcontroller.api);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
