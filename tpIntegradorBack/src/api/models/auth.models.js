import connection from '../database/db.js';

const loginUser = async (usuario) => {
    //Traigo solo usuario, comparo contraseña en el js..
    const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
    return connection.query(sql, [usuario]);
}
export default {
    loginUser
}