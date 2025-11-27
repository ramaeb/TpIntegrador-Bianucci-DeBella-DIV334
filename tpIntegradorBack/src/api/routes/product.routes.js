import { Router } from "express";
const router = Router();//Middelwares

import { validateId } from "../middlewares/middlewares.js";
import { getAllProducts, getProductById, putUpdateProduct ,putLogicDeleteProduct,postCreateProduct,deleteDeleteProduct} from "../controllers/product.controllers.js";

/*=================
    Endpoints
===================*/
router.get("/", getAllProducts);

router.get("/:id", validateId, getProductById);

router.put("/", putUpdateProduct);

router.put("/baja/:id", putLogicDeleteProduct);

router.post("/crear", postCreateProduct);

router.delete("/eliminar/:id", deleteDeleteProduct);

export default router;