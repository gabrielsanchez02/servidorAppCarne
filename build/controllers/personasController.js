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
class PersonasController {
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('SELECT * FROM T_persona', (err, persona, fields) => {
                    if (!err) {
                        res.json(persona);
                    }
                    else {
                        +console.log(err);
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
            yield database_1.default.query('SELECT * FROM t_repartidor WHERE id = ? ', [id], (err, persona, fields) => {
                if (!err) {
                    res.json(persona[0]);
                }
                else {
                    console.log(err);
                }
            });
        });
    }
    /* public async create(req: Request, res: Response): Promise<void> {
         const { consulta } = req.params;
         return this.pool.query('INSERT INTO users(id, name, creationTime) values($1, $2, $3)',
             [user.id, user.name, Date.now()]);
 
         await pool.query('INSERT INTO `T_personas`(
             `id`,
             `dni`,
             `sexo`,
             `latitud`,
             `longitud`,
             `qr_leido`,
             `dniUsr`,
             `idDispositivo`,
             `versionapp`
             ) values($1, $2, $3, $4, $5, $6, $7, $8)',
             ([consulta.id,
                 consulta.dni,
                 consulta.sexo,
                 consulta.latitud,
                 consulta.longitud,
                 consulta.qr_leido,
                 consulta.dniUsr,
                 consulta.idDispositivo,
                 consulta.versionapp]),
                 (err, persona, fields) => {
             if (!err) {
                 //res.json({ message: 'repartidor Saved' });
                 res.status(201).send(`Persona insertada con ID: ${persona.insertId}`);
                 res.json(persona);
             } else {
                 console.log(err)
             }
         });
 
     }*/
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldrepartidor = req.body;
            yield database_1.default.query('UPDATE T_persona set ? WHERE id = ?', [req.body, id]);
            res.json({ message: "The persona was Updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM T_persona WHERE id = ?', [id]);
            res.json({ message: "The game was deleted" });
        });
    }
}
const personasController = new PersonasController;
exports.default = personasController;
