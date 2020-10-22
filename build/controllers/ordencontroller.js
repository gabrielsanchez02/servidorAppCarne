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
class OrdenController {
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ordenes = yield database_1.default.query('SELECT * FROM t_ordenes');
                res.json(ordenes);
            }
            catch (err) {
                res.status(err.response.status);
                res.send(err.message);
            }
        });
    }
    getOne(req, res) {
        res.json({ text: 'esta es la orden ' + req.params.id });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO t_ordenes set ?', [req.body]);
            res.json({ msj: 'orden guardada' });
            console.log(req.body);
        });
    }
    put(req, res) {
        res.json({ text: 'actualizando una orden ' + req.params.id });
    }
    delete(req, res) {
        res.json({ text: 'eliminando una orden ' + req.params.id });
    }
}
exports.ordencontroller = new OrdenController();
