// src/routes/consultas.routes.ts
import { Router } from "express";
import { authenticateToken, requireUserType } from "../middleware/auth.middleware.js";
import * as ConsultasController from "../controllers/consultas.controller.js";

const router = Router();

// POST /api/consultas -> paciente agenda consulta
router.post("/", authenticateToken, requireUserType(["paciente"]), ConsultasController.criarConsulta);

export default router;
