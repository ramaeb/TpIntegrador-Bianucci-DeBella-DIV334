import { Router } from "express";
const router = Router();//Middelwares

import { validateId } from "../middlewares/middlewares.js";
import { getAllProducts, getProductById, putUpdateProduct } from "../controllers/product.controllers.js";

/*=================
    Endpoints
===================*/
router.get("/", getAllProducts);

router.get("/:id", validateId, getProductById);

router.put("/", putUpdateProduct);

export default router;