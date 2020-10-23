"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var database = require('../database');
class categoriaController {
    listado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            database.then(function (connection) {
                //console.log("entro a stock listado desp database");
                connection.query("SELECT * FROM categoria", function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    // console.log("enviando respuesta" +results);
                    res.json({ "error": false, results });
                });
            });
        });
    }
}
const CategoriaController = new categoriaController;
exports.default = CategoriaController;
