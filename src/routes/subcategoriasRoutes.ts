import { Router} from 'express';

import subcategoriascontroller from '../controllers/subcategoriaController';

class subcategoriasRoutes {
    
    public router:Router = Router();
    
    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', subcategoriascontroller.listado);
    
        
        //this.router.get('/:id', subcategoriascontroller.getOne);
        //this.router.post('/', subcategoriascontroller.create);       
        //this.router.put('/:id',subcategoriascontroller.update);
        //this.router.delete('/:id',subcategoriascontroller.delete)
               
    }   
}

export default new subcategoriasRoutes().router;



