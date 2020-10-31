





import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/indexRoutes";
import categoriasRoutes from "./routes/categoriasRoutes";
import localesRoutes from "./routes/localesRoutes";
import repartidoresRoutes from "./routes/repartidoresRoutes";
import stockRoutes from "./routes/stockRoutes";
import authRoutes from "./routes/authRoutes";

class Server {
  public app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  config(): void {
    this.app.set("port", process.env.port || 3500);
    this.app.use(morgan("dev"));
     // morgan sirve para monitorear el server GET PUT POST etc
    this.app.use(cors());
    this.app.use(express.json()); // puede entender json y convertir a obj js
    this.app.use(express.urlencoded({ extended: false })); //acepta enviar
desde formulario html3
  }
  routes(): void {
    this.app.use("/", indexRoutes);
    this.app.use("/api/categorias", categoriasRoutes);
    this.app.use("/api/locales", localesRoutes);
    this.app.use("/api/repartidores", repartidoresRoutes);
    this.app.use("/api/stock", stockRoutes);
    this.app.use("/login", authRoutes);
    //this.app.use('/api/personas',personasRoutes);
  }
  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("server en puerto", this.app.get("port"));
    });
  }
}
const server = new Server();
server.start();



















