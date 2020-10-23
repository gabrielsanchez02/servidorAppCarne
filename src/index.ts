import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import ordenesRoutes from './routes/ordenesRoutes';
import localesRoutes from './routes/localesRoutes';
import repartidoresRoutes from './routes/repartidoresRoutes';
import stockRoutes from './routes/stockRoutes';

class Server{
    public app:Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config():void{
        this.app.set('port', process.env.port || 3306)
        this.app.use(morgan( 'dev')); // morgan sirve para monitorear el server GET PUT POST etc
        this.app.use(cors());
        this.app.use(express.json()); // puede aceptar json 
        this.app.use(express.urlencoded({extended :false})); //acepta enviar desde formulario html
    }
    routes():void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/ordenes',ordenesRoutes);
        this.app.use('/api/locales',localesRoutes);
        this.app.use('/api/repartidores',repartidoresRoutes);
        this.app.use('/api/stock',stockRoutes);

    

        //this.app.use('/api/personas',personasRoutes);
    }
    start():void{
        this.app.listen(this.app.get('port'),()=> {
            console.log('server en puerto', this.app.get('port'))
        })
    }

}
const server=new Server();
server.start();


