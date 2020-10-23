import {Request, Response} from 'express';

class Indexcontroller {
    public index (req:Request,res:Response) {
        res.send ('hello')
    } 
    public carlos (req:Request,res:Response) {
        res.send ('carlos esta aqui')
    } 
    public api (req:Request,res:Response) {
        res.send ('entro')
    } 
}

export const indexcontroller = new Indexcontroller();