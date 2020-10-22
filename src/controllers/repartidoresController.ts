import { Request, Response } from 'express';


import pool from '../database';

class RepartidoresController {

    public async lista(req: Request, res: Response): Promise<void> {      
        try{
            await pool.query('SELECT * FROM t_repartidor', (err , repartidores , fields) => {
                if(!err){
                    res.json(repartidores)
                }else {+
                    console.log(err)
                }
            }); 
          }  catch (error){
            console.log(error)
            //res.status(error.response.status)
        };
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        await pool.query('SELECT * FROM t_repartidor WHERE ID_repartidor = ? ', [id], (err, repartidor, fields)=>{
            if(!err) {
                res.json(repartidor[0]);
                } else { 
                console.log(err)}
        });
        
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO ID_repartidor SET ?', req.body, (err, repartidor, fields)=>{
            if(!err) {
                //res.json({ message: 'repartidor Saved' });
                res.status(201).send(`repartidor added with ID: ${repartidor.insertId}`);
                res.json(repartidor);
                } else { 
                console.log(err)}
        }); 
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldrepartidor = req.body;
        await pool.query('UPDATE t_repartidor set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The repartidor was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM t_repartidor WHERE id = ?', [id]);
        res.json({ message: "The game was deleted" });
    }
}

const repartidoresController = new RepartidoresController;
export default repartidoresController;