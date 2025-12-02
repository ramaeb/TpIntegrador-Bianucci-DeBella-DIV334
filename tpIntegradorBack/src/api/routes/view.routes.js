import { Router } from "express";
export const router = Router();
import { vistaProductos } from "../controllers/view.controllers.js";

//Rutas de las vistas
router.get("/index", vistaProductos);

router.get("/consultar", (req, res) => {
    res.render("consultar");
});

router.get("/crear", (req, res) => {
    res.render("crear");
});

router.get("/modificar", (req, res) => {
    res.render("modificar");
});

router.get("/eliminar", (req, res) => {
    res.render("eliminar");
});

export default router;