import { Request, Response, NextFunction } from "express";
import connection from "../database";
var User = require("../modelos/user");
var MD5 = require("crypto-js/md5");

async function userisRegistrado(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;
  console.log({ username, password });

  var sql2 = "SELECT * FROM `users` WHERE username = '" + username + "'";
  //console.log(sql2);
  connection.query(sql2, (error, user, fields) => {
    //console.log(user[0].username);
    if (user[0] == null) {
      //  console.log(error);
      console.log("Usuario no encontrado ");
      res.status(404).json({
        error: true,
        autenticado: false,
        token: null,
        mensaje: "Usuario no registrado",
      });
      return;
    } else {
      const usuarioNuevo = new User(username, password);
      usuarioNuevo.password = MD5(usuarioNuevo.password).toString();
      // console.log({ usuarioNuevo });
      if (user[0].password != usuarioNuevo.password) {
        console.log("passowords DISTINTOS");
        res.status(404).json({
          error: true,
          autenticado: false,
          token: null,
          mensaje: "Password incorrecto",
        });
      } else {
        req.user = user[0];
        next();
      }
    }
  });
}
async function getServiciosUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req;
  console.log({ id });
  var sql1 =
    "SELECT `user_id`,`group_id` FROM `users_groups` WHERE user_id =" + id;
  //console.log(sql1);
  connection.query(sql1, (error, RolUsuario) => {
    if (error) {
      console.log({ error });
      res.json(error);
    } else {
      console.log({ RolUsuario });
      var values = RolUsuario[0].group_id;
      //console.log({ values });
      var sql =
        "SELECT `servicios`.`id`, `servicios`.`name` as servicio, `servicios_groups`.`group_id`, `groups`.`name`FROM `appcarne_app`.`servicios`INNER JOIN `appcarne_app`.`servicios_groups` ON (`servicios`.`id` = `servicios_groups`.`servicio_id`)INNER JOIN `appcarne_app`.`groups`ON (`servicios_groups`.`group_id` = `groups`.`id`)where `servicios_groups`.`group_id` = " +
        values;
      //console.log(sql);
      connection.query(sql, (error, servicios) => {
        if (error) {
          console.log(error);
          res.json(error);
        } else {
          // console.log({ servicios });
          //console.log("in funck");
          var lista: String[] = [];
          var index = 0;
          servicios.forEach((element: any) => {
            lista[index] = element.servicio;
            index++;
          });
          //console.log({ lista });
          req.servicios = lista;
          req.id = id;
          next();

          // res.json(lista);
        }
      });
    }
  });
}

export default {
  userisRegistrado,
  getServiciosUser,
};
