import mysql2 from "mysql2/promise";
import enviroments from "../config/enviroments.js";

//Importamos las variables de entorno del archivo enviroments.js en la carpeta config
const { database } = enviroments;

const connection = await mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;