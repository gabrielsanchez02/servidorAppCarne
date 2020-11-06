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
var jwt = require("jsonwebtoken");
var config = require("../config");
function jwtVerify(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
        jwt.verify(token, config.secreto, function (error, decode) {
            if (error) {
                console.log("dio error en validar token");
                return res.status(403).json({ error });
            }
            else {
                req.id = decode.id;
                next();
            }
        });
    });
}
exports.default = {
    jwtVerify,
};
