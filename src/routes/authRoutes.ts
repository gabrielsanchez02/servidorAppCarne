import express, { Router } from 'express';

import authController from '../controllers/authController';

class authRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/registrarse', authController.registrarse);
        this.router.post('/ingresar', authController.ingresar);
        this.router.get('/perfil', authController.perfil);
        
       /* this.router.get('/:id', stockController.getOne);
        this.router.post('/', stockController.create);
        this.router.put('/:id', stockController.update);
        this.router.delete('/:id', stockController.delete);*/
    }

}



export default new authRoutes().router;

