import { Router } from "express";
import {
    getCitysController,
    getCountryCitysController
} from "../controllers/city.controller.js";

const router = Router();

// Obtener ciudades
router.get("/citys",  getCitysController);

router.get("/citys/:country_id", getCountryCitysController);


export default router;