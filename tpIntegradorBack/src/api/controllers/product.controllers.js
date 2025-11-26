import ProductModel from "../models/product.models.js";

//GET => Trae  todos los productos
const getAllProducts = async (req, res) => {

    try {
        
        const [rows] = await ProductModel.selectAllProducts();

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados",
        })
    } catch (error) {

        console.error("Error en /products:", error.message);
        res.status(500).json({ message: "Error interno al obtener productos"});
    }
}

// GET => Trae el poducto por su ID
const getProductById = async (req, res) => {
    try {
        let { id } = req.params;
        //Optimizar id

        let [rows] = await ProductModel.selectProductById(id);

        res.status(200).json({
            payload: rows,
            message: "Producto no encontrado;"
        });
        
    } catch (error) {
        console.error(`Error obteniendo producto con id ${id}`, error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

//UPDATE => Actualizar productos
const putUpdateProduct = async (req, res) => {

    try {
        let { id, nombre, imagen_url, precio, categoria, descripcion, estado } = req.body;

        let [result] = await ProductModel.updateProductById(id, nombre, imagen_url, precio, categoria, descripcion, estado);

        res.status(200).json({
            ok: true,
            message: "Producto actualizado correctamente",
        })

    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor", error
        });
    }
}

export { 
    getAllProducts, 
    getProductById, 
    putUpdateProduct 
};