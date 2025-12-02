import authModels from "../models/auth.models.js";  
import bcrypt from "bcrypt";

const postLogin = async (req, res) => {
    try {
        let { usuario, password } = req.body;
        const [rows] = await authModels.loginUser(usuario);

        if (rows.length === 0) {
            return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
        }   

        let user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ ok: false, message: "Contraseña incorrecta" });
        }

        return res.status(200).json({ ok: true, user: user.usuario, message: "Login exitoso" });

    } catch(error) {
        res.status(500).json({ ok:false, message:"Error interno del servidor"});
        console.log("Error en la peticion: ", error);
    }
}

export { postLogin };
