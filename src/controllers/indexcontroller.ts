import {Request, Response} from 'express';

class Indexcontroller {
    public index (req:Request,res:Response) {
        res.send ('hello')
    } 
}

export const indexcontroller = new Indexcontroller();