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
var database = require("../database");
var User = require("../modelos/user");
class authController {
    singup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            const { username, password, email } = req.body;
            const usuario = new User(username, password, email, "");
            usuario.password = yield usuario.encriptaPass(usuario.password);
            console.log(usuario);
            // res.json({ mensaje: "recibido" }); 
            database.then(function (connection) {
                console.log("entro a auth y hacer la query");
                var sql = "INSERT INTO users (username, password, email, activation_code) VALUES ?";
                var values = [
                    [usuario.username],
                    [usuario.password],
                    [usuario.email],
                    [usuario.activation_code],
                ];
                console.log(sql);
                console.log(values);
                connection.query(sql + [values], function (error, results) {
                    if (error) {
                        console.log(error);
                        res.json({ error: true });
                        return;
                    }
                    console.log("enviando respuesta" + results);
                    res.json({ error: false, mensaje: "recibido", results });
                });
            });
        });
    }
    singin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            database.then(function (connection) {
                //console.log("entro a auth listado desp database");
                connection.query("", function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        res.json({ error: true });
                        return;
                    }
                    // console.log("enviando respuesta" +results);
                    res.json({ error: false, results });
                });
            });
        });
    }
    perfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            database.then(function (connection) {
                //console.log("entro a auth listado desp database");
                connection.query("", function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        res.json({ error: true });
                        return;
                    }
                    // console.log("enviando respuesta" +results);
                    res.json({ error: false, results });
                });
            });
        });
    }
}
const AuthController = new authController();
exports.default = AuthController;
