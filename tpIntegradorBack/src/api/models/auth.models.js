import connection from '../database/db.js';

const loginUser = async (usuario) => {
    const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
    return connection.query(sql, [usuario]);
}
export default {
    loginUser
}