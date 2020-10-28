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
var jwt = require("jsonwebtoken");
var config = require("../config");
var MD5 = require("crypto-js/md5");
class authController {
    registrarse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            const { username, password, email } = req.body;
            const usuario = new User(username, password, email, "");
            usuario.password = MD5(usuario.password).toString();
            console.log(usuario);
            database.then(function (connection) {
                //console.log("entro a auth listado desp database");
                var sql2 = "SELECT * FROM `users` WHERE username = '" + username + "'";
                // console.log(sql2);
                connection.query(sql2, function (error, user, fields) {
                    return __awaiter(this, void 0, void 0, function* () {
                        //console.log(user[0].username);
                        if (user[0] != null) {
                            //  console.log(error);
                            console.log("Usuario encontrado ");
                            res.status(404).json({
                                error: true,
                                mensaje: "Ya se encuentra un usuario registrado con ese nombre",
                            });
                            return;
                        }
                        else {
                            console.log("No se encontro usuario");
                            database.then(function (connection) {
                                //console.log("entro a auth y hacer la query");
                                var values = "('" +
                                    usuario.username +
                                    "','" +
                                    usuario.password +
                                    "','" +
                                    usuario.email +
                                    "','" +
                                    usuario.activation_code +
                                    "')";
                                var sql = "INSERT INTO users (username, password, email, activation_code) VALUES " +
                                    values;
                                //console.log(sql);
                                //console.log(values);
                                connection.query(sql, function (error, results) {
                                    if (error) {
                                        console.log(error);
                                        res.json({
                                            error: true,
                                            mensaje: "recibido",
                                            autenticado: false,
                                        });
                                        return;
                                    }
                                    // console.log("enviando respuesta" + results);
                                    var Userid = results.insertId;
                                    const token = jwt.sign({ id: Userid }, config.secreto, {
                                        expiresIn: 60 * 30,
                                    });
                                    res.json({
                                        error: false,
                                        mensaje: "Nuevo usuario creado",
                                        autenticado: true,
                                        token,
                                        Userid,
                                    });
                                });
                            });
                        }
                    });
                });
            });
            // res.json({ mensaje: "recibido" });
        });
    }
    ingresar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            const { username, password } = req.body;
            database.then(function (connection) {
                //console.log("entro a auth listado desp database");
                var sql2 = "SELECT * FROM `users` WHERE username = '" + username + "'";
                // console.log(sql2);
                connection.query(sql2, function (error, user, fields) {
                    return __awaiter(this, void 0, void 0, function* () {
                        //console.log(user[0].username);
                        if (user[0] == null) {
                            //  console.log(error);
                            console.log("Usuario no encontrado ");
                            res
                                .status(404)
                                .json({ error: true, mensaje: "Usuario no registrado" });
                            return;
                        }
                        else {
                            const usuarioNuevo = new User(username, password);
                            usuarioNuevo.password = MD5(usuarioNuevo.password).toString();
                            // console.log({ usuarioNuevo });
                            if (user[0].password != usuarioNuevo.password) {
                                console.log("passowords DISTINTOS");
                                res.status(401).json({
                                    error: true,
                                    autenticado: false,
                                    token: null,
                                    mensaje: "Password incorrecto",
                                });
                            }
                            else {
                                console.log("passowords coinciden");
                                const token = jwt.sign({ id: user[0].id }, config.secreto, {
                                    expiresIn: 60 * 60,
                                });
                                //console.log("passowords DISTINTOS");
                                // res.redirect('');
                                // console.log(user[0].password);
                                res.json({ error: false, autenticado: true, token, user });
                            }
                        }
                        // const passValido = await usuarioNuevo.validatePassword(password);
                    });
                });
            });
        });
    }
    perfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            const token = req.headers["x-access-token"];
            console.log({ token });
            if (!token) {
                res
                    .status(401)
                    .json({ autenticado: false, mensaje: "No ha provisto un token" });
            }
            //console.log(decode.id);
            var decode = jwt.verify(token, config.secreto);
            console.log({ decode });
            /* decode = jwt.verify(token, config.secreto, function (
               err: any,
               decoded: any
             ) {
               if (err) {
                 //console.log({err,decoded})
                 res.status(401).json({ err, mensaje: "token expiro" });
               } else {
                 var decodeTrue = jwt.verify(token, config.secreto);
                 console.log({ decode, decodeTrue });
                 decode = decodeTrue;
               }
             });
             console.log({ "antes ": decode });
             decode = jwt.verify(token, config.secreto);
            */
            database.then(function (connection) {
                var sql1 = "SELECT * FROM `users` WHERE id =" + decode.id;
                //console.log(decode.id + " " + sql1);
                connection.query(sql1, function (error, usuario) {
                    if (error) {
                        console.log(error);
                        res
                            .status(401)
                            .json({ error: true, mensaje: "Usuario no encontrado" });
                        return;
                    }
                    else {
                        console.log(usuario);
                        console.log("error: " + error);
                        res.json({ error, usuario });
                    }
                });
            });
        });
    }
}
const AuthController = new authController();
exports.default = AuthController;
