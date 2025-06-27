import express from "express";
import { Router } from "express";
import {    
  insertarResultadoController,
  getResultadosController,
  getResultadoByIdController,
  updateResultadoController,
  deleteResultadoController,
  getTablaPosicionesController,
} from "../controllers/resultadosController.mjs";

const router = Router();

router.get("/", getResultadosController);
router.post("/insertarResultado", insertarResultadoController);
router.get("/obtenerResultado", getResultadoByIdController);
router.put("/updateResultado", updateResultadoController);
router.delete("/deleteResultado", deleteResultadoController);
router.get("/tablaPosiciones", getTablaPosicionesController);

export default router;
