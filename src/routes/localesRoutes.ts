import express, { Router } from 'express';

import localesController from '../controllers/localesController';

class LocalesRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        //this.router.get('/', localesController.lista);
        //this.router.get('/:id', localesController.getOne);
        //this.router.post('/', localesController.create);
        //this.router.put('/:id', localesController.update);
        //this.router.delete('/:id', localesController.delete);
    }

}

export default new LocalesRoutes().router;

