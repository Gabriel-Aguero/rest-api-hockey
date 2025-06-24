import express from "express";
import { Router } from "express";
import {
  insertJugadoresController,
  getJugadoresController,
  getJugadoresByCategoryController,
  getJugadorByIdController,
  deleteJugadorController,
  editarJugadorController,
  getJugadoresAllController,
} from "../controllers/jugadoresController.mjs";
import { authenticateToken } from "../middleware/authMiddleware.mjs";

const router = Router();

// insertar jugador
router.post("/", authenticateToken, insertJugadoresController);

// obtener todos los jugadores del torneo
router.get("/jugadoresAll", getJugadoresAllController);

// obtener todos los jugadores de un club
router.get("/", getJugadoresController);

// obtener un jugador por su id
router.get("/obtenerJugador", getJugadorByIdController);

// obtener los jugadores por categoria
router.get("/jugadorCategorias", getJugadoresByCategoryController);

// eliminar un jugador
router.delete("/eliminarJugador", deleteJugadorController);

// actualizar un jugador
router.put("/editarJugador", editarJugadorController);

export default router;
