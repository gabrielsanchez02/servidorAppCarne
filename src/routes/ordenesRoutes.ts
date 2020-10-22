import { Router} from 'express';

import ordencontroller from '../controllers/ordenesController';

class OrdenesRoutes {
    
    public router:Router = Router();
    
    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', ordencontroller.lista);
        this.router.get('/:id', ordencontroller.getOne);
        this.router.post('/', ordencontroller.create);       
        this.router.put('/:id',ordencontroller.update);
        this.router.delete('/:id',ordencontroller.delete)
        
    }   
}

export default new OrdenesRoutes().router;


