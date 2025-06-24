import express from "express";
import { Router } from "express";
import {
  getClubesInscriptosController,
  getJugadoresTotalesController,
  getTecnicosTotalesController,
  getEquiposMasJugadoresController,
  getCategoriasMasJugadoresController,
  getJugadoresPorClubCategoriaController,
} from "../controllers/estadisticasController.mjs";

const router = Router();

router.get("/clubesInscriptos", getClubesInscriptosController);
router.get("/jugadoresTotales", getJugadoresTotalesController);
router.get("/tecnicosTotales", getTecnicosTotalesController);
router.get("/equiposMasJugadores", getEquiposMasJugadoresController);
router.get("/categoriasMasJugadores", getCategoriasMasJugadoresController);
router.get(
  "/jugadoresPorClubCategoria",
  getJugadoresPorClubCategoriaController
);

export default router;
