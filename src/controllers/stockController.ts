import { Request, Response } from "express";

//import database from "../database";

var database = require('../database');


class stockController {

  public async listado(req: Request, res: Response): Promise<void> {
    // async connection to database
 
    database.then(function(connection: { query: (arg0: string, arg1: (error: any, results: any, fields: any) => void) => void; }){
   
        //console.log("entro a stock listado desp database");
        connection.query(" SELECT stock.idprod, stock.nombre, categoria.nombre, stock.valor_referencia, subcategoria.nombre, stock.Unid, stock.unidades FROM (subcategoria INNER JOIN stock ON subcategoria.id_subcat = stock.subcategoria) INNER JOIN categoria ON subcategoria.id_categoria = categoria.id_cat WHERE (((stock.unidades)>0))", function(error: any, results: any, fields: any) {
            if (error) {
                console.log(error);
                res.json({"error": true});
                return;
            }
           // console.log("enviando respuesta" +results);
            res.json({"error": false ,results});
        });
    });

}
/*
  public async lista(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("SELECT * FROM stock", (err: any, stock: any, fields: any) => {
        if (!err) {
          res.json(stock);
        } else {
          +console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
      //res.status(error.response.status)

      /*
            
            SELECT stock.idprod, stock.nombre, categoria.nombre, stock.valor_referencia, subcategoria.nombre, stock.Unid, stock.unidades
                FROM (subcategoria INNER JOIN stock ON subcategoria.id_subcat = stock.subcategoria) INNER JOIN categoria ON subcategoria.id_categoria = categoria.id_cat
                WHERE (((stock.unidades)>0));
            
           
    }
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    await pool.query(
      "SELECT * FROM t_repartidor WHERE ID_repartidor = ? ",
      [id],
      (err: any, repartidor: any[], fields: any) => {
        if (!err) {
          res.json(repartidor[0]);
        } else {
          console.log(err);
        }
      }
    );
  }

  public async create(req: Request, res: Response): Promise<void> {
    await pool.query(
      "INSERT INTO ID_repartidor SET ?",
      req.body,
      (err: any, repartidor: { insertId: any; }, fields: any) => {
        if (!err) {
          //res.json({ message: 'repartidor Saved' });
          res 
            .status(201)
            .send(`repartidor added with ID: ${repartidor.insertId}`);
          res.json(repartidor);
        } else {
          console.log(err);
        }
      }
    );
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const oldrepartidor = req.body;
    await pool.query("UPDATE t_repartidor set ? WHERE id = ?", [req.body, id]);
    res.json({ message: "The repartidor was Updated" });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("DELETE FROM t_repartidor WHERE id = ?", [id]);
    res.json({ message: "The game was deleted" });
  }*/
}

const StockController = new stockController();
export default StockController;
