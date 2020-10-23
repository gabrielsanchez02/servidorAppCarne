import { Router} from 'express';
import {indexcontroller} from '../controllers/indexcontroller';

class IndexRoutes {
    
    router:Router = Router();
    
    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', indexcontroller.index);
        this.router.get('/carlos', indexcontroller.carlos);
        this.router.get('/api', indexcontroller.api);
    }

}


const indexRoutes = new IndexRoutes();
export default indexRoutes.router;