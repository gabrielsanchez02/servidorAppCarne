import { Request, Response } from 'express';
import pool from '../database';


class PersonasController {

    public async lista(req: Request, res: Response): Promise<void> {
        try {
            await pool.query('SELECT * FROM T_persona', (err, persona, fields) => {
                if (!err) {
                    res.json(persona)
                } else {
                    +
                        console.log(err)
                }
            });
        } catch (error) {
            console.log(error)
            //res.status(error.response.status)
        };
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await pool.query('SELECT * FROM t_repartidor WHERE id = ? ', [id], (err, persona, fields) => {
            if (!err) {
                res.json(persona[0]);
            } else {
                console.log(err)
            }
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

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldrepartidor = req.body;
        await pool.query('UPDATE T_persona set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The persona was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM T_persona WHERE id = ?', [id]);
        res.json({ message: "The game was deleted" });
    }
}

const personasController = new PersonasController;
export default personasController;