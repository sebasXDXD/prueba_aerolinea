import { Router } from "express";
import {
    getUsersController,
    createUserController,
} from "../controllers/users.controller.js";

const router = Router();

// Obtener tickets
router.get("/users", getUsersController);
// Guardar Tickets
router.post("/users", createUserController);

export default router;