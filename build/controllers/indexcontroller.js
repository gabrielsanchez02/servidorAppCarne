"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Indexcontroller {
    index(req, res) {
        res.send('hello');
    }
    carlos(req, res) {
        res.send('carlos esta aqui');
    }
    api(req, res) {
        res.send('entro');
    }
}
exports.indexcontroller = new Indexcontroller();
