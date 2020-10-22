import express, { Router } from 'express';

import personasController from '../controllers/personasController';

class PersonasRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', personasController.lista);
        this.router.get('/:id', personasController.getOne);
        //this.router.post('/', personasController.create);
        this.router.put('/:id', personasController.update);
        this.router.delete('/:id', personasController.delete);
        
        
        this.router.post('/add', (req,res) =>{ // <- La función middleware ya no es async
            const {title, url, description } = req.body;
            const newLink={
                title,
                url,
                description
                //ALMACENA ESOS DATOS EN LA VARIABLE NEWLINK
            };
        });
    }

}



export default new PersonasRoutes().router;

