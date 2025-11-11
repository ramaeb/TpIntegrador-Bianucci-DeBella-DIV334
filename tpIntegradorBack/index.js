import express from 'express';
import enviroments from './src/api/config/enviroments.js';
import connection from './src/api/database/db.js';
import cors from "cors";

const app = express();

const PORT = enviroments.port;

/*=================
    Middlewares
===================*/
app.use(cors());


/*=================
    Endpoints
===================*/

//Ruta principal
app.get("/", (req, res) => {
    res.send("Bienvenido al TP Integrador");
});

//Ruta traer productos
app.get("/products", async (req, res) => {

    try {
        const sql = "SELECT * FROM productos";
        const [rows] = await connection.query(sql);
        
        res.status(200).json({
            payload: rows
        })
    } catch (error) {

        console.error("Error en /products:", error.message);
        res.status(500).json({ message: "Error interno al obtener productos"});
    }
});

// Get product by ID
app.get("/products/:id", async (req, res) => {
    try {
        let { id } = req.params;

        
    } catch (error) {
        console.error('Error obtiniendo prodctos con id ${id}', error.message)
    }
})

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});