import { Router } from "express";
import { postLogin } from "../controllers/auth.controllers.js";
const router = Router();//Middelwares

//Endpoints auth

router.post("/login",postLogin);

export default router;