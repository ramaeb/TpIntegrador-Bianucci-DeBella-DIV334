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
//Baja logica sql
const logicDeleteProduct = (id) => {
    let sql = `
        UPDATE productos
        SET estado = 0
        WHERE id = ?
    `;
    return connection.query(sql,[id]);
}

//SQL de crear product.

const createProduct = (nombre, imagen_url, precio, categoria, descripcion, estado) => {
        let sql = `
                INSERT INTO productos (nombre, imagen_url, precio, categoria , descripcion , estado )
                VALUES (?,?,?,?,?,?);
            `;
        return connection.query(sql, [nombre, imagen_url, precio, categoria, descripcion, estado]);
}

//SQL de eliminar producto.
const deleteProduct = (id) => {
    let sql = `
        DELETE FROM productos WHERE productos.id = ?;
    `;
    return connection.query(sql, [id]);
}

export default {
    selectAllProducts,
    selectProductById,
    updateProductById,
    logicDeleteProduct,
    createProduct,
    deleteProduct
}