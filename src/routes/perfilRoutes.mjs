import express from "express";
import { Router } from "express";
import {
  getPerfilController,
  getPerfilByIdController,
  getEstadoClubController,
  updateEstadoClubController,
  updatePerfilController,
} from "../controllers/perfilController.mjs";

const router = Router();

router.get("/", getPerfilController);
router.get("/perfilById", getPerfilByIdController);
router.get("/estadoClub", getEstadoClubController);
router.put("/updatePerfil", updatePerfilController);
router.put("/updateEstado", updateEstadoClubController);

export default router;
