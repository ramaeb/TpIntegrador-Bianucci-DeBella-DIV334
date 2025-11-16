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
app.use(express.json());  

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

        let sql = "SELECT * FROM productos WHERE productos.id = ?";

        let [rows] = await connection.query(sql, [id])

        res.status(200).json({
            payload: rows
        });
        
    } catch (error) {
        console.error(`Error obteniendo producto con id ${id}`, error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


// Crear producto.
app.post("/products",async (req, res) => {
    try
    {
      const {nombre,descripcion,precio,categoria,imagen_url,estado} = req.body;
      //consulta sql
      const sql = "INSERT INTO productos (nombre,descripcion,precio,categoria,imagen_url,estado) VALUES (?, ?, ?, ?, ?,?)";
      //query remplazando los valores 
      const [result] = await connection.query(sql, [nombre,descripcion,precio,categoria,imagen_url,estado]);
        
      res.status(201).json({
        message: "Producto creado exitosamente",
        id_generado: result.insertId
      })
    } catch (error) {   
        console.error("Error creando producto:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});


app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});