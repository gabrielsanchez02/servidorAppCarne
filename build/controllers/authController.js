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
//var connection = require("../database");
var User = require("../modelos/user");
var jwt = require("jsonwebtoken");
var config = require("../config");
var MD5 = require("crypto-js/md5");
const axios = require("axios");
class authController {
    registrarse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            const { username, password, email } = req.body;
            const usuario = new User(username, password, email, "");
            usuario.password = MD5(usuario.password).toString();
            console.log(usuario);
            //console.log("entro a auth listado desp database");
            var sql2 = "SELECT * FROM `users` WHERE username = '" + username + "'";
            // console.log(sql2);
            database_1.default.query(sql2, (error, user) => {
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
                    //console.log("entro a auth y hacer la query");
                    var d = new Date();
                    var dformat = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-") +
                        " " +
                        [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
                    console.log(dformat);
                    var values = "('" +
                        usuario.username +
                        "','" +
                        usuario.password +
                        "','" +
                        usuario.email +
                        "','" +
                        usuario.ip_address +
                        "','" +
                        dformat +
                        "')";
                    var sql = "INSERT INTO users (username, password, email, ip_address,created_on) VALUES " +
                        values;
                    //console.log(sql);
                    //console.log(values);
                    database_1.default.query(sql, (error, results) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            console.log(error);
                            console.log("enviando respuesta" + results);
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
                        var RolUsuario = 3;
                        // seteamos por defecto el rol del usuaio tipo cliente = 3 en seg parametro de la func
                        // console.log(Userid);
                        if (!insert_idUser_G(Userid, RolUsuario)) {
                            console.log("entro a la respuesta");
                            //console.log({ servicios });S
                            res.json({
                                error: false,
                                mensaje: "Nuevo usuario creado",
                                autenticado: true,
                                token,
                            });
                            // await this.getServiciosUser(RolUsuario, Response);
                        }
                    }));
                }
            });
            // res.json({ mensaje: "recibido" });
        });
    }
    ingresar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // async connection to database
            const { user } = req;
            const token = jwt.sign({ id: user.id }, config.secreto, {
                expiresIn: 60 * 30,
            });
            res.json({
                error: false,
                mensaje: "Nuevo ingreso de usuario",
                autenticado: true,
                token,
            });
            //  }
            // }
            // const passValido = await usuarioNuevo.validatePassword(password);
            //  });
        });
    }
    perfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ ts-ignore
            const { id, servicios } = req;
            //console.log({ id });
            // console.log("variable decode id: "+decode.id);
            if (id != undefined) {
                var sql1 = "SELECT * FROM `users` WHERE id =" + id;
                //console.log(decode.id + " " + sql1);
                database_1.default.query(sql1, (error, usuario) => {
                    if (error) {
                        console.log(error);
                        res
                            .status(404)
                            .json({ error: true, mensaje: "Usuario no encontrado" });
                        return;
                    }
                    else {
                        //console.log(usuario);
                        //console.log("error: " + error);
                        res.json({ error, usuario, servicios });
                    }
                });
            }
        });
    }
}
function insert_idUser_G(Userid, RolUsuario) {
    var values = "('" + Userid + "','" + RolUsuario + "')";
    var sql = "INSERT INTO users_groups (user_id, group_id) VALUES " + values;
    database_1.default.query(sql, (error, user_group, fields) => {
        if (error) {
            console.log(error);
            return false;
        }
        else {
            //console.log({user_group});
            return true;
        }
    });
}
const AuthController = new authController();
exports.default = AuthController;
