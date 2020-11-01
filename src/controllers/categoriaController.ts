import { Request, Response } from "express";

import connection from "../database";

class categoriaController {
  public async listado(req: Request, res: Response): Promise<void> {
    // async connection to database
    //console.log("entro a stock listado desp database");
    connection.query(
      "SELECT CAST(`categoria`.`id_cat` AS CHAR) AS `id`, `categoria`.`nombre` AS `title`, '2020-07-28T21:07:57.217Z' AS `createdAt`, '' AS `imagen`, `categoria`.id_cat AS `numOfProducts` FROM `categoria` WHERE orden>0 ORDER BY `orden`  ASC",
      function (error, categorias, fields) {
        if (error) {
          console.log(error);
          res.json({ error: true });
          return;
        }
        // console.log("enviando respuesta" +results);
        res.json({ error: false, categorias });
      }
    );
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

const CategoriaController = new categoriaController();
export default CategoriaController;
