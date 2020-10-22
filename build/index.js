"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const ordenesRoutes_1 = __importDefault(require("./routes/ordenesRoutes"));
const localesRoutes_1 = __importDefault(require("./routes/localesRoutes"));
const repartidoresRoutes_1 = __importDefault(require("./routes/repartidoresRoutes"));
const repartidoresRoutes_2 = __importDefault(require("./routes/repartidoresRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.port || 3306);
        this.app.use(morgan_1.default('dev')); // morgan sirve para monitorear el server GET PUT POST etc
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json()); // puede aceptar json 
        this.app.use(express_1.default.urlencoded({ extended: false })); //acepta enviar desde formulario html
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/ordenes', ordenesRoutes_1.default);
        this.app.use('/api/locales', localesRoutes_1.default);
        this.app.use('/api/repartidores', repartidoresRoutes_1.default);
        this.app.use('/api/stock', repartidoresRoutes_2.default);
        //this.app.use('/api/personas',personasRoutes);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server en puerto', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
