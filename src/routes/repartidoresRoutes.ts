import express, { Router } from 'express';

import repartidoresController from '../controllers/repartidoresController';

class RepartidoresRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
      //  this.router.get('/', repartidoresController.lista);
      //  this.router.get('/:id', repartidoresController.getOne);
      //  this.router.post('/', repartidoresController.create);
      //  this.router.put('/:id', repartidoresController.update);
      //  this.router.delete('/:id', repartidoresController.delete);
    }

}



export default new RepartidoresRoutes().router;

