import express from "express";
import { Router } from "express";
import {
  insertClubesController,
  getClubesController,
  editarClubesController,
} from "../controllers/clubesController.mjs";

const router = Router();

router.post("/insertarClub", insertClubesController);
router.get("/", getClubesController);
router.put("/editarClub", editarClubesController);
// router.get("/", authenticateToken, getClubesController);

export default router;
