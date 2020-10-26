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
//import database from "../database";
var database = require('../database');
class stockController {
    listado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            database.then(function (connection) {
                //console.log("entro a stock listado desp database");
                connection.query(" SELECT stock.idprod, stock.nombre, categoria.nombre, stock.valor_referencia, subcategoria.nombre, stock.Unid, stock.unidades FROM (subcategoria INNER JOIN stock ON subcategoria.id_subcat = stock.subcategoria) INNER JOIN categoria ON subcategoria.id_categoria = categoria.id_cat WHERE (((stock.unidades)>0))", function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        res.json({ "error": true });
                        return;
                    }
                    // console.log("enviando respuesta" +results);
                    res.json({ "error": false, results });
                });
            });
        });
    }
    listadoxcant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            database.then(function (connection) {
                const { cant, subcat } = req.params;
                console.log('entra');
                console.log(cant);
                //console.log("entro a stock listado desp database");
                //SELECT stock.idprod AS id, '2020-07-28T21:07:57.217Z' AS `createdAt`, stock.nombre AS title, stock.valor_referencia AS price, subcategoria.nombre AS category, 'https://www.produccionsrl.com/wp-content/uploads/2018/11/25-500-Cerdo-Punta-de-espalda1.jpg' AS `imagen`, 'sub Titulo' AS "subTitle", 'descripcion' AS 'description' FROM (subcategoria INNER JOIN stock ON subcategoria.id_subcat = stock.subcategoria) INNER JOIN categoria ON subcategoria.id_categoria = categoria.id_cat WHERE (((stock.unidades)>"+ cant +") AND (`subcategoria`.`id_subcat` = "+ subcat +"));
                connection.query("SELECT stock.idprod AS id, '2020-07-28T21:07:57.217Z' AS `createdAt`, stock.nombre AS title, stock.valor_referencia AS price, subcategoria.nombre AS category, 'https://www.produccionsrl.com/wp-content/uploads/2018/11/25-500-Cerdo-Punta-de-espalda1.jpg' AS `image`, 'sub Titulo' AS 'subTitle', 'descripcion' AS 'description' FROM (subcategoria INNER JOIN stock ON subcategoria.id_subcat = stock.subcategoria) INNER JOIN categoria ON subcategoria.id_categoria = categoria.id_cat WHERE (((stock.unidades)>" + cant + ") AND (`subcategoria`.`id_subcat` = " + subcat + "))", function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        res.json({ "error": true });
                        return;
                    }
                    // console.log("enviando respuesta" +results);
                    res.json({ "error": false, results });
                });
            });
        });
    }
}
const StockController = new stockController();
exports.default = StockController;
