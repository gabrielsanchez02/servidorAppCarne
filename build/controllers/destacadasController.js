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
class destacadaController {
    listado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            database.then(function (connection) {
                //console.log("entro a stock listado desp database");
                connection.query("SELECT CAST(`subcategoria`.`id_categoria` AS CHAR) AS `id`, `subcategoria`.`nombre` AS `title`, '2020-07-28T21:07:57.217Z' AS `createdAt`, 'http://www.donpollo.cl/wp-content/uploads/2018/01/punta-costillar.3.png' AS `imagen`, `subcategoria`.id_subcat AS `numOfProducts` FROM `appcarne_app`.subcategoria INNER JOIN `appcarne_app`.categoria ON (`subcategoria`.id_categoria = `categoria`.id_cat) WHERE (`subcategoria`.id_categoria = 4) LIMIT 5,10;", function (error, categorias, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    // console.log("enviando respuesta" +results);
                    res.json({ "error": false, destacadass });
                });
            });
        });
    }
}
const DestacadasController = new destacadaController;
exports.default = DestacadasController;
