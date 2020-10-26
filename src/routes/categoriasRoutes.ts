import { Router} from 'express';

import categoriascontroller from '../controllers/categoriaController';

class categoriasRoutes {
    
    public router:Router = Router();
    
    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', categoriascontroller.listado);
        
        //this.router.get('/:id', categoriascontroller.getOne);
        //this.router.post('/', categoriascontroller.create);       
        //this.router.put('/:id',categoriascontroller.update);
        //this.router.delete('/:id',categoriascontroller.delete)
               
    }   
}

export default new categoriasRoutes().router;



