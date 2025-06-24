import express from "express";
import { Router } from "express";
import {
  getTecnicosController,
  insertTecnicoController,
  getTecnicoByIdController,
  getTecnicosByCategoryController,
  editarTecnicoController,
} from "../controllers/tecnicoController.mjs";

const router = Router();

router.get("/", getTecnicosController);
router.get("/tecnicoByid", getTecnicoByIdController);
router.get("/tecnicoCategoria", getTecnicosByCategoryController);
router.post("/insertarTecnico", insertTecnicoController);
router.put("/editarTecnico", editarTecnicoController);

export default router;
