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
class LocalesController {
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('SELECT * FROM t_local', (err, locales, fields) => {
                    if (!err) {
                        res.json(locales);
                    }
                    else {
                        console.log(err);
                    }
                });
            }
            catch (error) {
                console.log(error);
                //res.status(error.response.status)
            }
            ;
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM t_local WHERE ID_local = ? ', [id], (err, local, fields) => {
                if (!err) {
                    res.json(local[0]);
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.default.query('INSERT INTO t_local set ?', [req.body]);
                console.log(req, result);
                res.json({ message: 'local guardado' });
            }
            catch (error) {
                //res.status(error.response.status)
            }
            ;
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldlocal = req.body;
            yield database_1.default.query('UPDATE t_local set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "The local was Updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM t_local WHERE id = ?', [id]);
            res.json({ message: "The game was deleted" });
        });
    }
}
const localesController = new LocalesController;
exports.default = localesController;
