import connection from '../database/db.js';

const selectAllProducts = () => {
    const sql = "SELECT * FROM productos";
    return connection.query(sql);
}

const selectProductById = (id) => { 

    let sql = "SELECT * FROM productos WHERE productos.id = ?";

    return connection.query(sql, [id])
}

const updateProductById = (id, nombre, imagen_url, precio, categoria, descripcion, estado) => { 
    
        let sql = `
            UPDATE productos
            SET nombre = ?, imagen_url = ?, precio = ?, categoria = ?, descripcion = ?, estado = ?
            WHERE id = ?
        `;

        return connection.query(sql, [nombre, imagen_url, precio, categoria, descripcion, estado, id]);
}

export default {
    selectAllProducts,
    selectProductById,
    updateProductById
}