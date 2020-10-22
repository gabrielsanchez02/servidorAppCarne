import { Router} from 'express';
import {indexcontroller} from '../controllers/indexcontroller';

class IndexRoutes {
    
    router:Router = Router();
    
    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', indexcontroller.index);
    }

}


const indexRoutes = new IndexRoutes();
export default indexRoutes.router;