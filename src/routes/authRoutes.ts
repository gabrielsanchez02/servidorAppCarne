import express, { Router } from 'express';

import authController from '../controllers/authController';
import JWTvalidador from '../middlewares/JWTvalidador';
import UserValidador from '../middlewares/UserValidador';
import getServiciosUser from '../middlewares/UserValidador';

class authRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.post('/registrarse', authController.registrarse);
        this.router.post('/ingresar',[UserValidador.userisRegistrado], authController.ingresar);
        this.router.get('/perfil',[JWTvalidador.jwtVerify,UserValidador.getServiciosUser],  authController.perfil);
      //  this.router.get('/servicios', authController.getServiciosUser);
        
       /* this.router.get('/:id', stockController.getOne);
        this.router.post('/', stockController.create);
        this.router.put('/:id', stockController.update);
        this.router.delete('/:id', stockController.delete);*/
    }

}



export default new authRoutes().router;

