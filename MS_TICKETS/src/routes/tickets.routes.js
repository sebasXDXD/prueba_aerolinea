import { Router } from "express";
import {
    getTicketsController,
    createTicketController,
} from "../controllers/tickets.controller.js";

const router = Router();
// Guardar Tickets
router.post("/tickets", createTicketController);
// Obtener tickets
router.get("/tickets", getTicketsController);
export default router;