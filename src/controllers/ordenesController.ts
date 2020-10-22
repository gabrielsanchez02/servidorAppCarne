import { Request, Response } from 'express';


import pool from '../database';

class OrdenesController {

    public async lista(req: Request, res: Response): Promise<void> {      
        try{
            await pool.query('SELECT * FROM t_orden', (err , ordenes , fields) => {
                if(!err){
                    res.json(ordenes)
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
        await pool.query('SELECT * FROM t_orden WHERE ID_ord = ? ', [id], (err, ordenes, fields)=>{
            if(!err) {
                res.json(ordenes[0]);
                } else { 
                console.log(err)}
        });
        
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO t_orden set ?', [req.body]);
        console.log(req,result);  
        res.json({ message: 'ordenes Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldordenes = req.body;
        await pool.query('UPDATE t_orden set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The ordenes was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM t_orden WHERE id = ?', [id]);
        res.json({ message: "The game was deleted" });
    }
}

const ordenesController = new OrdenesController;
export default ordenesController;