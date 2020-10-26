import express, { Router } from 'express';

import stockController from '../controllers/stockController';

class stockRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', stockController.listado);
        this.router.get('/:cant/:subcat', stockController.listadoxcant);
        /*this.router.post('/', stockController.create);
        this.router.put('/:id', stockController.update);
        this.router.delete('/:id', stockController.delete);*/
    }

}



export default new stockRoutes().router;

