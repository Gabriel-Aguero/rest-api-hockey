import express from "express";
import { Router } from "express";
import {
  generarPDFController,
  fixturePDFControllerApertura,
  fixturePDFControllerClausura,
} from "../controllers/pdfController.mjs";

const router = Router();

router.get("/generar-pdf", generarPDFController);
router.get("/fixture-apertura", fixturePDFControllerApertura);
router.get("/fixture-clausura", fixturePDFControllerClausura);

export default router;
