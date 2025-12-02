import authModels from "../models/auth.models.js";  
import bcrypt from "bcrypt";
//POST => Login de usuario

const postLogin = async (req,res) =>{
    try{
        let {usuario, password} = req.body;
        const [rows] = await authModels.loginUser(usuario);
        console.log(rows);
        if (rows.length === 0) {
            return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
        }   
        bcrypt.compare("admin", "$2a$12$N4yn6Oz96q8fkkUeKtzBzuJr69gMoEsW0iU8MNhxSBIpCliM9AUUm").then(console.log("OK !"))
        let user = rows[0] //USER es el objeto con los datos del usuario encontrado...
        if(await bcrypt.compare(password, user.password)){
            return res.status(200).json({ ok: true, user:user.usuario, message: "Login exitoso" });
        }
        else{
            return res.status(401).json({ ok: false, message: "Contraseña incorrecta" });
        }

    }catch(error){
        res.status(500).json({ok:false, message:"Error interno del servidor"});
        
        console.log("Error en la peticion: ", error);
    }
}
export {postLogin};