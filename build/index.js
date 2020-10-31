"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const categoriasRoutes_1 = __importDefault(require("./routes/categoriasRoutes"));
const localesRoutes_1 = __importDefault(require("./routes/localesRoutes"));
const repartidoresRoutes_1 = __importDefault(require("./routes/repartidoresRoutes"));
const stockRoutes_1 = __importDefault(require("./routes/stockRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
<<<<<<< HEAD
        this.app.set("port", process.env.port || 3000);
=======
        this.app.set("port", process.env.port || 3500);
<<<<<<< HEAD
>>>>>>> f2d525b74f4cfa5544408e81bb7cea0abb8d0ac7
        this.app.use(morgan_1.default("dev")); // morgan sirve para monitorear el server GET PUT POST etc
=======
        this.app.use(morgan_1.default("dev"));
        // morgan sirve para monitorear el server GET PUT POST etc
>>>>>>> eb4152a2a2a6cb29ef14605c67e36d107797be20
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json()); // puede entender json y convertir a obj js
        this.app.use(express_1.default.urlencoded({ extended: false })); //acepta enviar desde formulario html3
    }
    routes() {
        this.app.use("/", indexRoutes_1.default);
        this.app.use("/api/categorias", categoriasRoutes_1.default);
        this.app.use("/api/locales", localesRoutes_1.default);
        this.app.use("/api/repartidores", repartidoresRoutes_1.default);
        this.app.use("/api/stock", stockRoutes_1.default);
        this.app.use("/login", authRoutes_1.default);
        //this.app.use('/api/personas',personasRoutes);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("server en puerto", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();



