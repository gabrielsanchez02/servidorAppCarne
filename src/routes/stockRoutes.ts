import express, { Router } from 'express';

import stockController from '../controllers/stockController';

class stockRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/', stockController.lista);
        this.router.get('/:id', stockController.getOne);
        this.router.post('/', stockController.create);
        this.router.put('/:id', stockController.update);
        this.router.delete('/:id', stockController.delete);
    }

}



export default new stockRoutes().router;

