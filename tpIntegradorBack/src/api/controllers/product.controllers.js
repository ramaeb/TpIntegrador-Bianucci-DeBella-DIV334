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

//PUT => Baja lógica de productos
const putLogicDeleteProduct = async (req,res) =>{
    try{
        let {id} = req.params; //El id se obtiene desde los parametros NO Desde el BODY OK!!
        let [result] = await ProductModel.logicDeleteProduct(id);

        res.status(200).json({
            ok:true,
            message: "Producto dado de baja correctamente"
        })

    }catch(error){
        res.status(500).json({ok:false,message:"Error interno del servidor", error})
    }
}

//POST => Crear producto
const postCreateProduct = async (req,res)=>{
    try{
        let {nombre, imagen_url, precio, categoria, descripcion, estado} = req.body;
        let [result] = await ProductModel.createProduct(nombre, imagen_url, precio, categoria, descripcion, estado);
        res.status(200).json({
            ok:true,
            message: "Producto creado correctamente"
        })
    }catch(error){
        res.status(500).json({message:"Error interno del servidor al crear", error})
    }
}
//DELETE => Eliminar producto
const deleteDeleteProduct = async (req,res)=>{
    try{
        let {id} = req.params;
        let [result] = await ProductModel.deleteProduct(id);
        res.status(200).json({
            ok:true,
            message: "Producto eliminado correctamente"
        })
    }catch(error){
        res.status(500).json({message:"Error interno del servidor al eliminar", error})
    }
}

export { 
    getAllProducts, 
    getProductById, 
    putUpdateProduct,
    putLogicDeleteProduct,
    postCreateProduct,
    deleteDeleteProduct
};