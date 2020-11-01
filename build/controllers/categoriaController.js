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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class categoriaController {
    listado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            //console.log("entro a stock listado desp database");
            database_1.default.query("SELECT CAST(`categoria`.`id_cat` AS CHAR) AS `id`, `categoria`.`nombre` AS `title`, '2020-07-28T21:07:57.217Z' AS `createdAt`, '' AS `imagen`, `categoria`.id_cat AS `numOfProducts` FROM `categoria` WHERE orden>0 ORDER BY `orden`  ASC", function (error, categorias, fields) {
                if (error) {
                    console.log(error);
                    res.json({ error: true });
                    return;
                }
                // console.log("enviando respuesta" +results);
                res.json({ error: false, categorias });
            });
        });
    }
}
const CategoriaController = new categoriaController();
exports.default = CategoriaController;
