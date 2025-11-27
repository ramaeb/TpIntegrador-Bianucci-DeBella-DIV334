import { Router } from "express";
export const router = Router();

//Rutas de las vistas
router.get("/index", async (req, res) => {
    res.render("index")
});

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

router.put("/baja/:id",(req,res)=>{
    res.render("baja");
})
export default router;