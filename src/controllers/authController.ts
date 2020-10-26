import e, { Request, Response } from "express";
import { token } from "morgan";

//import database from "../database";

var database = require("../database");
var User = require("../modelos/user");
var jwt = require("jsonwebtoken");
var config = require("../config");
var MD5 = require("crypto-js/md5");

class authController {
  public async registrarse(req: Request, res: Response): Promise<void> {
    // async connection to database
    const { username, password, email } = req.body;
    const usuario = new User(username, password, email, "");
    usuario.password = MD5(usuario.password).toString();
    console.log(usuario);

    // res.json({ mensaje: "recibido" });
    database.then(function (connection: {
      query: (
        arg0: string,
        arg1: (error: any, results: any, fields: any) => void
      ) => void;
    }) {
      //console.log("entro a auth y hacer la query");

      var values =
        "('" +
        usuario.username +
        "','" +
        usuario.password +
        "','" +
        usuario.email +
        "','" +
        usuario.activation_code +
        "')";
      var sql =
        "INSERT INTO users (username, password, email, activation_code) VALUES " +
        values;

      //console.log(sql);
      //console.log(values);

      connection.query(sql, function (error: any, results: any) {
        if (error) {
          console.log(error);
          res.json({ error: true, mensaje: "recibido", autenticado: false });
          return;
        }
        // console.log("enviando respuesta" + results);

        var Userid = results.insertId;

        const token = jwt.sign({ id: Userid }, config.secreto, {
          expiresIn: 60 * 30, //media hora 60 sec * 30 // 60*60*24 = 1 dia
        });
        res.json({
          error: false,
          mensaje: "recibido",
          autenticado: true,
          token,
          Userid,
        });
      });
    });
  }

  public async ingresar(req: Request, res: Response): Promise<void> {
    // async connection to database

    const { username, password } = req.body;
    database.then(function (connection: {
      query: (
        arg0: string,
        arg1: (error: any, results: any, fields: any) => void
      ) => void;
    }) {
      //console.log("entro a auth listado desp database");
      var sql2 = "SELECT * FROM `users` WHERE username = '" + username + "'";
      // console.log(sql2);
      connection.query(sql2, async function (
        error: any,
        user: any,
        fields: any
      ) {
        //console.log(user[0].username);
        if (user[0] == null) {
          //  console.log(error);
          console.log("Usuario no encontrado ");
          res
            .status(404)
            .json({ error: true, mensaje: "Usuario no registrado" });
          return;
        } else {
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
          } else {
            console.log("passowords coinciden");

            const token = jwt.sign({ id: user[0].id }, config.secreto, {
              expiresIn: 60 * 30, //media hora 60 sec * 30 // 60*60*24 = 1 dia
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
  }

  public async perfil(req: Request, res: Response): Promise<void> {
    // async connection to database

    const token = req.headers["x-access-token"];
    if (!token) {
      res
        .status(401)
        .json({ autenticado: false, mensaje: "No ha provisto un token" });
    }
    const decode = jwt.verify(token, config.secreto);
    // console.log(decode.id);

    database.then(function (connection: {
      query: (
        arg0: string,
        arg1: (error: any, results: any, fields: any) => void
      ) => void;
    }) {
      var sql1 = "SELECT * FROM `users` WHERE id =" + decode.id;
      connection.query(sql1, function (error: any, usuario: any) {
        if (error) {
          console.log(error);
          res
            .status(401)
            .json({ error: true, mensaje: "Usuario no encontrado" });
          return;
        }
        res.json({ error: false, usuario });
      });
    });
  }

  /*
  public async lista(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("SELECT * FROM stock", (err: any, stock: any, fields: any) => {
        if (!err) {
          res.json(stock);
        } else {
          +console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
      //res.status(error.response.status)

      /*
            
            SELECT stock.idprod, stock.nombre, categoria.nombre, stock.valor_referencia, subcategoria.nombre, stock.Unid, stock.unidades
                FROM (subcategoria INNER JOIN stock ON subcategoria.id_subcat = stock.subcategoria) INNER JOIN categoria ON subcategoria.id_categoria = categoria.id_cat
                WHERE (((stock.unidades)>0));
            
           
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    await pool.query(
      "SELECT * FROM t_repartidor WHERE ID_repartidor = ? ",
      [id],
      (err: any, repartidor: any[], fields: any) => {
        if (!err) {
          res.json(repartidor[0]);
        } else {
          console.log(err);
        }
      }
    );
  }

  public async create(req: Request, res: Response): Promise<void> {
    await pool.query(
      "INSERT INTO ID_repartidor SET ?",
      req.body,
      (err: any, repartidor: { insertId: any; }, fields: any) => {
        if (!err) {
          //res.json({ message: 'repartidor Saved' });
          res 
            .status(201)
            .send(`repartidor added with ID: ${repartidor.insertId}`);
          res.json(repartidor);
        } else {
          console.log(err);
        }
      }
    );
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const oldrepartidor = req.body;
    await pool.query("UPDATE t_repartidor set ? WHERE id = ?", [req.body, id]);
    res.json({ message: "The repartidor was Updated" });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("DELETE FROM t_repartidor WHERE id = ?", [id]);
    res.json({ message: "The game was deleted" });
  }*/
}

const AuthController = new authController();
export default AuthController;
