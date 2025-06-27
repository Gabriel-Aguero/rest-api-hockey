import express from "express";
import { Router } from "express";
import { getEquiposController } from "../controllers/equiposController.mjs";

const router = Router();

router.get("/equipos", getEquiposController);

export default router;
