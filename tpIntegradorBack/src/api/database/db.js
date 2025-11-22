import mysql2 from "mysql2/promise";
import enviroments from "../config/enviroments.js";

const { database } = enviroments;

const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;

