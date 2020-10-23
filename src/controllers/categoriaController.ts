import { Request, Response } from 'express';


var database = require('../database');

class categoriaController {

    public async listado(req: Request, res: Response): Promise<void> {
        // async connection to database
     
        database.then(function(connection: { query: (arg0: string, arg1: (error: any, results: any, fields: any) => void) => void; }){
       
            //console.log("entro a stock listado desp database");
            connection.query("SELECT * FROM categoria", function(error: any, results: any, fields: any) {
                if (error) {
                    console.log(error);
                    return;
                }
               // console.log("enviando respuesta" +results);
                res.send(results);
            });
        });
    
    }
/*
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
    }*/
}

const CategoriaController = new categoriaController;
export default CategoriaController;