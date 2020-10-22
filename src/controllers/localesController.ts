

import { Request, Response } from 'express';
import pool from '../database';


class LocalesController {

    public async lista(req: Request, res: Response): Promise<void> {      
        try{
            await pool.query('SELECT * FROM t_local', (err , locales , fields) => {
                if(!err){
                    res.json(locales)
                }else {
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
        await pool.query('SELECT * FROM t_local WHERE ID_local = ? ', [id], (err, local, fields)=>{
            if(!err) {
                res.json(local[0]);
                } else { 
                console.log(err)}
        });
        
    }

    public async create(req: Request, res: Response): Promise<void> {
        try{
            const result = await pool.query('INSERT INTO t_local set ?', [req.body]);
            console.log(req,result);  
            res.json({ message: 'local guardado' });
          } catch (error){
              //res.status(error.response.status)
          };



    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldlocal = req.body;
        await pool.query('UPDATE t_local set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The local was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM t_local WHERE id = ?', [id]);
        res.json({ message: "The game was deleted" });
    }
}

const localesController = new LocalesController;
export default localesController;