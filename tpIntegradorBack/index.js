import express from 'express';
const app = express();

import enviroments from './src/api/config/enviroments.js';
const PORT = enviroments.port;

import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js"
import { productRoutes, viewRoutes, authRoutes} from "./src/api/routes/index.js";
import { join, __dirname } from './src/api/utils/index.js';

/*=================
    Middlewares
===================*/
app.use(cors());
app.use(express.json());
app.use(loggerUrl);

//Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public")));

/*=================
    Configuracion
===================*/
app.set("view engine", "ejs");//Configuramos EJS como motor de plantillas
app.set("views", join(__dirname, "src/views"));//Indicamos la ruta de las vistas

/*=================
    Rutas
===================*/
app.use("/api/products", productRoutes);

app.use("/dashboard", viewRoutes);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});