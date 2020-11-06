import { Request, Response, NextFunction } from "express";
var jwt = require("jsonwebtoken");
var config = require("../config");

async function jwtVerify(req: Request, res: Response, next: NextFunction) {
 
  const token = req.headers["authorizacion"];
  console.log({ token });
  if (!token) {
    console.log("No ha provisto un token");
    res.status(403).json({
      error: {
        name: "",
        message: "No ha provisto un token",
        expiredAt: "",
      },
    });
  }
  //console.log(decode.id)
  jwt.verify(token, config.secreto, function (error: any, decode: any) {
    if (error) {
      console.log("dio error en validar token");
      return res.status(403).json({ error });
    } else {
      req.id = decode.id;
      next();
    }
  });
}

export default {
  jwtVerify,
};
