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
class OrdenesController {
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('SELECT * FROM t_orden', (err, ordenes, fields) => {
                    if (!err) {
                        res.json(ordenes);
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
            yield database_1.default.query('SELECT * FROM t_orden WHERE ID_ord = ? ', [id], (err, ordenes, fields) => {
                if (!err) {
                    res.json(ordenes[0]);
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO t_orden set ?', [req.body]);
            console.log(req, result);
            res.json({ message: 'ordenes Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldordenes = req.body;
            yield database_1.default.query('UPDATE t_orden set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "The ordenes was Updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM t_orden WHERE id = ?', [id]);
            res.json({ message: "The game was deleted" });
        });
    }
}
const ordenesController = new OrdenesController;
exports.default = ordenesController;
