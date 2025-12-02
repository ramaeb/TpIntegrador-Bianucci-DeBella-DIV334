import connection from '../database/db.js';

/*IMPORTANTE: 
Sobre el encriptado de las contraseñas, se usa AES ENCRIPT, al no tener el registro de usuarios implementado se encripta manualmente en la base de datos


SELECT
AES_ENCRYPT('admin', '2409'); 

EL USO DE "2409" ES LA KEY PARA ENCRIPTAR Y DESENCRIPTAR, (MODO DE EJEMPLO PARA MOSTRAR A PROFESORES, NO USAR EN REPO FINAL)
*/ 


const loginUser = async (usuario) => {
    //Traigo solo usuario, comparo contraseña en el js..
    const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
    return connection.query(sql, [usuario]);
}
export default {
    loginUser
}