import express from "express";
import { Router } from "express";
import {
  getZonasController,
  getCategoriaPorZonaController,
  getEquiposPorZonaController,
  insertarResultadoController,
  getResultadosController,
  getTablaPosicionesController,
  getResultadoByIdController,
  updateResultadoController,
  deleteResultadoController,
} from "../controllers/resultadosController.mjs";

const router = Router();

router.get("/", getResultadosController);
router.get("/zonas", getZonasController);
router.get("/categoriaPorZona", getCategoriaPorZonaController);
router.get("/equiposPorZona", getEquiposPorZonaController);
router.get("/obtenerResultado", getResultadoByIdController);
router.get("/tablaPosiciones", getTablaPosicionesController);
router.post("/insertarResultado", insertarResultadoController);
router.put("/updateResultado", updateResultadoController);
router.delete("/deleteResultado", deleteResultadoController);

export default router;
